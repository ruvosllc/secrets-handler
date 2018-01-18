const cleanPath = require('./cleanPath')
const setByPath = require('./setByPath')
const assert = require('assert')
const aws = require('aws-sdk')

module.exports = ({ path, awsConfig } = {}) => {
  assert.equal(typeof path, 'string', 'path should be a string')
  path = cleanPath(path)

  function fetchParams (NextToken) {
    const ssm = new aws.SSM(awsConfig)
    return ssm.getParametersByPath({
      Path: path,
      WithDecryption: true,
      NextToken
    }).promise()
    .then(handlePagination)
  }

  function handlePagination ({ Parameters = [], NextToken } = {}) {
    if (NextToken) {
      return fetchParams(NextToken)
      .then(next => ({ Parameters: Parameters.concat(next.Parameters) }))
    }
    return { Parameters }
  }

  function handleNumber (item) {
    if (/^[0-9]+$/.test(item)) {
      return +item
    }
    return item
  }

  function handleBoolean (item) {
    if (item === 'false') {
      return false
    }
    if (item === 'true') {
      return true
    }
    return item
  }

  function parseParams ({ Parameters = [] } = {}) {
    return Parameters.reduce((acc, param) => {
      const pathToLeaf = param.Name.replace(path, '').split('.').map(handleNumber)
      setByPath({ object: acc, path: pathToLeaf, value: handleNumber(handleBoolean(param.Value)) })
      return acc
    }, {})
  }

  return fetchParams()
  .then(parseParams)
}

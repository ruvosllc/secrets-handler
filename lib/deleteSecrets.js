const cleanPath = require('./cleanPath')
const fetchParams = require('./fetchParams')
const assert = require('assert')
const aws = require('aws-sdk')
const chunk = require('./chunk')

module.exports = ({ path, awsConfig } = {}) => {
  assert.equal(typeof path, 'string', 'path should be a string')
  path = cleanPath(path)

  function deleteParams ({ Parameters }) {
    const ssm = new aws.SSM(awsConfig)
    const input = Parameters.map(p => p.Name)
    const fn = Names => ssm.deleteParameters({ Names }).promise()
    const size = 10
    return chunk({ input, fn, size })
  }

  return fetchParams({ path, awsConfig })
  .then(deleteParams)
}

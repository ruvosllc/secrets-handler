const cleanPath = require('./cleanPath')
const assert = require('assert')
const traverse = require('traverse')
const aws = require('aws-sdk')
const deleteSecrets = require('./deleteSecrets')

module.exports = ({ path, merge, overwrite, secrets, awsConfig, keyId } = {}) => {
  path = cleanPath(path)

  assert.equal(typeof secrets, 'object', 'secrets should be an object')

  const ssm = new aws.SSM(awsConfig)

  function handleOverwrite () {
    if (overwrite) {
      return deleteSecrets({ path, awsConfig })
    }
    return Promise.resolve()
  }

  return handleOverwrite()
  .then(() => Promise.all(traverse(secrets).reduce(function (proms, Value) {
    if (this.isLeaf && Value !== null) {
      Value = Value.toString()
      const Name = `${path}${this.path.join('.')}`
      const params = {
        Name,
        Value,
        Type: 'SecureString',
        Overwrite: !!merge,
        KeyId: keyId
      }
      proms.push(
        ssm.putParameter(params).promise()
        .then(({ Version }) => ({
          Name,
          Value,
          Version
        }))
      )
    }
    return proms
  }, []))
  .catch((error) => {
    if (error.code === 'ParameterAlreadyExists') {
      error.message = `Matching secrets already exist. To replace them, use the merge or overwrite option.`
    }
    throw error
  }))
}

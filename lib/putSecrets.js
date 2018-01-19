const cleanPath = require('./cleanPath')
const assert = require('assert')
const traverse = require('traverse')
const aws = require('aws-sdk')

module.exports = ({ path, merge, secrets, awsConfig, keyId } = {}) => {
  path = cleanPath(path)

  assert.equal(typeof secrets, 'object', 'secrets should be an object')

  const ssm = new aws.SSM(awsConfig)

  return Promise.all(traverse(secrets).reduce(function (proms, Value) {
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
      error.message = `A parameter already exists. To replace it, use the merge option.`
    }
    throw error
  })
}

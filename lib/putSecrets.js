const cleanPath = require('./cleanPath')
const assert = require('assert')
const traverse = require('traverse')
const aws = require('aws-sdk')

module.exports = ({ path, overwrite, secrets, awsConfig } = {}) => {
  path = cleanPath(path)

  assert.equal(typeof secrets, 'object', 'secrets should be an object')

  const ssm = new aws.SSM(awsConfig)

  return Promise.all(traverse(secrets).reduce(function (proms, Value) {
    if (this.isLeaf) {
      const Name = `${path}${this.path.join('.')}`
      const params = {
        Name,
        Value,
        Type: 'SecureString',
        Overwrite: !!overwrite
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
}

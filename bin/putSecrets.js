#!/usr/bin/env node

const putSecrets = require('../lib/putSecrets')

const action = (path, { merge, keyId }) => {
  let secretsString = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('readable', () => {
    secretsString += process.stdin.read() || ''
  })

  process.stdin.on('end', () => {
    const secrets = JSON.parse(secretsString)
    putSecrets({ path, merge, keyId, secrets })
    .then(result => {
      process.stdout.write(JSON.stringify(result, null, 2))
      process.exit()
    })
    .catch(err => {
      process.stderr.write(err.toString())
      process.exit(1)
    })
  })
}

module.exports = action

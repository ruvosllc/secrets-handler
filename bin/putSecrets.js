#!/usr/bin/env node

const putSecrets = require('../lib/putSecrets')
const commander = require('commander')
const packageInfo = require('../package.json')

commander
.version(packageInfo.version)
.option('-p, --path <path>', 'Specify a path to be used as a prefix on the parameter names. If none is provided a UUID will be used to prevent parameter name collision.')
.option('-o, --overwrite', 'Flag indicating that existing parameters should be overwritten.')
.option('-k, --key-id <keyId>', 'Specify a KMS key to use when encrypting parameters. Defaults to your AWS account\'s default key.')
.parse(process.argv)

let secretsString = ''
process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  secretsString += process.stdin.read() || ''
})

process.stdin.on('end', () => {
  const secrets = JSON.parse(secretsString)
  putSecrets({ path: commander.path, overwrite: commander.overwrite, keyId: commander.keyId, secrets })
  .then(result => {
    process.stdout.write(JSON.stringify(result, null, 2))
    process.exit()
  })
  .catch(err => {
    process.stderr.write(err.toString())
    process.exit(1)
  })
})

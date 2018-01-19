#!/usr/bin/env node

const deleteSecrets = require('../lib/deleteSecrets')
const commander = require('commander')
const packageInfo = require('../package.json')

commander
.version(packageInfo.version)
.option('-p, --path <path>', 'Specify the path prefix of the parameters to be deleted.')
.parse(process.argv)

deleteSecrets({ path: commander.path || '/' })
.then(result => {
  process.stdout.write(JSON.stringify(result, null, 2))
  process.exit()
})
.catch(err => {
  process.stderr.write(err.message)
  process.exit(1)
})

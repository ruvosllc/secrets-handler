#!/usr/bin/env node

const getSecrets = require('../lib/getSecrets')
const commander = require('commander')
const packageInfo = require('../package.json')

commander
.version(packageInfo.version)
.option('-p, --path <path>', 'Specify a path to be used as a prefix for fetched parameters.')
.parse(process.argv)

getSecrets({ path: commander.path || '/' })
.then(secrets => {
  process.stdout.write(JSON.stringify(secrets, null, 2))
  process.exit()
})
.catch(err => {
  process.stderr.write(err.message)
  process.exit(1)
})

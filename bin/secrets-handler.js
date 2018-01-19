#!/usr/bin/env node

const commander = require('commander')
const packageInfo = require('../package.json')
const putSecrets = require('./putSecrets')
const getSecrets = require('./getSecrets')
const deleteSecrets = require('./deleteSecrets')

commander
.version(packageInfo.version)
.usage('[command] [options]')

commander
.command('get <path>')
.description('Fetch a collection of secrets from AWS SSM by path and write them to standard output as a single JSON object.')
.action(getSecrets)

commander
.command('put <path>')
.description('Read a secrets object from standard input and store it as individual parameters in AWS SSM.')
.option('-m, --merge', 'Merge new secrets over old. Existing parameters are overwritten only if present in the new set of secrets.')
.option('-k, --key-id <keyId>', 'Specify a KMS key to use when encrypting parameters. Defaults to your AWS account\'s default key.')
.action(putSecrets)

commander
.command('delete <path>')
.description('Delete a collection of secrets from AWS SSM by path and write the response to standard output.')
.action(deleteSecrets)

commander.parse(process.argv)

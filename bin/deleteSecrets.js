#!/usr/bin/env node

const deleteSecrets = require('../lib/deleteSecrets')

const action = (path) => {
  deleteSecrets({ path })
  .then(result => {
    process.stdout.write(JSON.stringify(result, null, 2))
    process.exit()
  })
  .catch(err => {
    process.stderr.write(err.message)
    process.exit(1)
  })
}

module.exports = action

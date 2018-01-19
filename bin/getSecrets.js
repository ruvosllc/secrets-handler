#!/usr/bin/env node

const getSecrets = require('../lib/getSecrets')

const action = (path) => {
  getSecrets({ path })
  .then(secrets => {
    process.stdout.write(JSON.stringify(secrets, null, 2))
    process.exit()
  })
  .catch(err => {
    process.stderr.write(err.message)
    process.exit(1)
  })
}

module.exports = action

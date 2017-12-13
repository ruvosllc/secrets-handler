const uuid = require('uuid')

module.exports = path => (`/${path || uuid()}/`).replace(/\/{2,}/g, '/')

const test = require('ava').test
const index = require('../')

test('exports putSecrets', t => {
  t.is(typeof index.putSecrets, 'function')
})

test('exports getSecrets', t => {
  t.is(typeof index.getSecrets, 'function')
})

test('exports deleteSecrets', t => {
  t.is(typeof index.deleteSecrets, 'function')
})

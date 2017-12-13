const test = require('ava').test
const setByPath = require('../lib/setByPath')

test('can set properties on the root of an empty object', t => {
  const object = {}
  const path = ['a']
  const value = 1
  const expected = { a: 1 }
  t.deepEqual(setByPath({ object, path, value }), expected)
})

test('can set properties on the root of a non-empty object', t => {
  const object = { b: 2 }
  const path = ['a']
  const value = 1
  const expected = { a: 1, b: 2 }
  t.deepEqual(setByPath({ object, path, value }), expected)
})

test('can set properties nested within an object', t => {
  const object = {}
  const path = ['a', 'b']
  const value = 1
  const expected = { a: { b: 1 } }
  t.deepEqual(setByPath({ object, path, value }), expected)
})

test('recognizes numeric paths as array indices', t => {
  const object = {}
  const path = ['a', 0]
  const value = 1
  const expected = { a: [1] }
  t.deepEqual(setByPath({ object, path, value }), expected)
})

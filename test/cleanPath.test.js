const test = require('ava').test
const cleanPath = require('../lib/cleanPath')

test('trims repeat "/"', t => {
  t.is(cleanPath('///a/b//c///d/////'), '/a/b/c/d/')
})

test('prefixes and suffixes "/"', t => {
  t.is(cleanPath('a'), '/a/')
})

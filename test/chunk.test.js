const test = require('ava').test
const chunk = require('../lib/chunk')

test('will chunk a function when results are numbers', t => {
  const input = [1, 2]
  const fn = x => x * 2
  const size = 1
  return chunk({ input, fn, size })
  .then(res => {
    t.deepEqual(res, [2, 4])
  })
})

test('will chunk a function when results are strings', t => {
  const input = [1, 2]
  const fn = x => x.toString()
  const size = 1
  return chunk({ input, fn, size })
  .then(res => {
    t.deepEqual(res, ['1', '2'])
  })
})

test('will chunk a function when results are objects', t => {
  const input = [1, 2, 3, 4]
  const fn = x => {
    return { x: x }
  }
  const size = 2
  return chunk({ input, fn, size })
  .then(res => {
    t.deepEqual(res, { x: [1, 2, 3, 4] })
  })
})

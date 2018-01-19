const mergewith = require('lodash.mergewith')

function merger (a, b) {
  if (Array.isArray(a)) {
    return a.concat(b)
  }
}

function merge (results) {
  if (!(results[0] instanceof Object)) {
    return results
  }
  return mergewith(...results, merger)
}

module.exports = ({ input, fn, size = 1 }) => {
  const proms = []
  while (input.length) {
    const chunk = input.splice(0, size)
    proms.push(fn(chunk))
  }
  return Promise.all(proms)
  .then(merge)
}

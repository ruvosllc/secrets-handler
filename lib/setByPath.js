module.exports = ({ object, path = [], value } = {}) => {
  let node = object
  let i = 0
  for (i; i < path.length - 1; i++) {
    const key = path[i]
    if (!node.hasOwnProperty(key)) {
      if (/^[0-9]+$/.test(path[i + 1])) {
        node[key] = []
      } else {
        node[key] = {}
      }
    }
    node = node[key]
  }
  node[path[i]] = value
  return object
}

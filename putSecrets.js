const cleanPath = require('./lib/cleanPath')

module.exports = ({ path, overwrite, secrets }) => {
  path = cleanPath(path)
}

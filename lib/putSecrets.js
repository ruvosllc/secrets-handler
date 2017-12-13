const cleanPath = require('./cleanPath')

module.exports = ({ path, overwrite, secrets }) => {
  path = cleanPath(path)
}

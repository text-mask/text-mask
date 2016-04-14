module.exports = function(path, alternative) {
  const isVerify = process.argv[process.argv.length - 1] === '--verify'

  if (isVerify) {
    return alternative
  } else {
    const required = require(path)

    if (required.default) {
      return required.default
    } else {
      return required
    }
  }
}

module.exports = function() {
  return process.argv[process.argv.length - 1] === '--verify'
}

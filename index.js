var deepEqual = require('deep-equal')
  , through = require('through')

module.exports = dedupe

function dedupe() {
  var stream = through(write)
  var lastSeen = null

  return stream

  function write(data) {
    if(equal(data, lastSeen)) {
      return
    }

    lastSeen = data ? clone(data) : data
    stream.queue(data)
  }
}

function equal(x, y) {
  return deepEqual(x, y, {strict: true})
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

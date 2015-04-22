var test = require('tape')

var dedupeStream = require('../')

test('does not emit consecutive equal data', function(t) {
  t.plan(2)

  var dedupe = dedupeStream()

  dedupe.once('data', function(data) {
    t.equal(data, 'apple')
  })

  dedupe.write('apple')

  dedupe.once('data', function(data) {
    t.equal(data, 'orange')
  })

  dedupe.write('apple')
  dedupe.write('orange')
})

test('works with objects', function(t) {
  t.plan(2)

  var dedupe = dedupeStream()

  dedupe.once('data', function(data) {
    t.deepEqual(data, {type: 'apple'})
  })

  dedupe.write({type: 'apple'})

  dedupe.once('data', function(data) {
    t.deepEqual(data, {type: 'orange'})
  })

  dedupe.write({type: 'apple'})
  dedupe.write({type: 'orange'})
})

test('clones emissions for comparison', function(t) {
  t.plan(2)

  var dedupe = dedupeStream()

  dedupe.once('data', function(data) {
    t.deepEqual(data, {type: 'apple'})

    data.type = 'orange'
  })

  dedupe.write({type: 'apple'})

  dedupe.once('data', function(data) {
    t.deepEqual(data, {type: 'orange'})
  })

  dedupe.write({type: 'apple'})
  dedupe.write({type: 'orange'})
})

test('emits undefined if written to with it initially', function(t) {
  t.plan(1)

  var dedupe = dedupeStream()

  dedupe.once('data', function(data) {
    t.equal(data, undefined)
  })

  dedupe.write(undefined)
})

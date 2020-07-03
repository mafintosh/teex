const tape = require('tape')
const tee = require('./')
const { Readable } = require('streamx')

tape('throttled by eachother', function (t) {
  const r = new Readable()

  for (let i = 0; i < 1000; i++) {
    r.push(Buffer.alloc(1000))
  }

  const [a, b] = tee(r)

  let aTicks = 0

  a.on('data', function (data) {
    aTicks++
  })

  setTimeout(() => b.read(), 100)

  setTimeout(() => {
    t.same(aTicks, 18)
    t.end()
  }, 200)
})

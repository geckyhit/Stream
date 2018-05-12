const StreamVanil = require('./lib/StreamVanil')
const StreamFunc = require('./lib/StreamFunc')
const { delay } = require('./lib/utils/async')

const sv1 = new StreamVanil(async ({ emit }) => {
    emit(1)
    await delay(500)
    emit(2)
})

sv1.observe(x => console.log('sv1:', x))

const sf1 = new StreamFunc(async (send) => {
    send(1)
    await delay(500)
    send(2)
})

sf1.observe(x => console.log('sf1:', x))
const StreamVanil = require('./lib/StreamVanil')
const StreamFunc = require('./lib/StreamFunc')
const StreamVanilHot = require('./lib/StreamVanilHot')
const { delay } = require('./lib/utils/async')

//COLDS:
const sv1 = new StreamVanil(async ({ emit }) => {
    emit(1)
    await delay(500)
    emit(2)
})

sv1.observe(x => console.log('sv1:', x)) //-1-2


const sf1 = new StreamFunc(async (send) => {
    send(1)
    await delay(500)
    send(2)
})

sf1.observe(x => console.log('sf1:', x)) //-1-2
/*------*/

//HOT:
const svh1 = new StreamVanilHot(async ({ emit }) => {
    emit(1)
    await delay(500)
    emit(2)
})

svh1.observe(x => console.log('svh1:', x))//-2
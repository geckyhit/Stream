const StreamVanil = require('./lib/StreamVanil')
const StreamFunc = require('./lib/StreamFunc')
const StreamVanilHot = require('./lib/StreamVanilHot')
const PullStream = require('./lib/PullStream')
const PushStream = require('./lib/PushStream')
const { delay } = require('./lib/utils/async')

/*********************************/
// PullStream:
let streamFn = (() => {
    let countCb = 0;
    return cb => {
        cb(countCb)
        countCb++
    }
})()

let ps = new PullStream(streamFn)

ps.consume(streamFn => {
    streamFn(function next(countCb) {
        console.log(countCb)
        setTimeout(() => {
            streamFn(next)
        }, 1000)
    })
})
/*********************************/



/*********************************/
//PushStream:
let s = new PushStream(observeFn => {
    let c = 0
    setInterval(() => {
        observeFn(c++)
    }, 1000)
})

s.observe(console.log)
/*********************************/

/*********************************/
//COLDS:
// const sv1 = new StreamVanil(async ({ emit }) => {
//     emit(1)
//     await delay(500)
//     emit(2)
// })

// sv1.observe(x => console.log('sv1:', x)) //-1-2


// const sf1 = new StreamFunc(async (send) => {
//     send(1)
//     await delay(500)
//     send(2)
// })

// sf1.observe(x => console.log('sf1:', x)) //-1-2
/*********************************/

/*********************************/
//HOT:
// const svh1 = new StreamVanilHot(async ({ emit }) => {
//     await delay(50)
//     emit(1)
//     await delay(600)
//     emit(2)
// });

// (async () => {
//     svh1.observe(x => console.log('svh1.0', x))
//     await delay(100)
//     svh1.observe(x => console.log('svh1.1', x))
// })()
//svh1.0 @-1-2->
//svh1.1   @-2->
/*********************************/
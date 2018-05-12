const { EventEmitter } = require('events');

class Stream {
    constructor(streamFn) {
        this.streamFn = streamFn
    }

    observe(observeFn) {
        let _send = (data) => {
            observeFn(data)
        }
        this.streamFn(_send)
    }

    map(mapFn) {
        return new Stream((send) => {
            const _send = (data) => send(mapFn(data))
            this.observe(_send)
        })
    }
}

module.exports = Stream
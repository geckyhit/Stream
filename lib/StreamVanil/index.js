const { EventEmitter } = require('events');

const noop = () => null

class Stream {
    constructor(streamFn) {
        this.streamFn = streamFn
        this.emitter = new EventEmitter()
    }

    map(mapFn) {
        return new Stream(emitter => {
            return this.observe(x => {
                emitter.emit(mapFn(x))
            })
        })
    }

    observe(observeFn) {
        this.emitter.on("data", observeFn)
        let unsubscribeFn = this.streamFn({
            emit: (x) => this.emitter.emit("data", x)
            // TODO end, etc.
        }) || noop
        return () => {
            if (unsubscribeFn)
                unsubscribeFn()
            this.emitter.off("data", observeFn)
        }
    }
}

module.exports = Stream
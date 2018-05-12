const { EventEmitter } = require('events');

class Stream {
    constructor(streamFn) {
        this.streamFn = streamFn
        this.emitter = new EventEmitter();
        this.streamFn({
            emit: (x) => this.emitter.emit("data", x)
        })
    }

    map(mapFn) {
        return new Stream(emitter => {
            return this.observe(x => {
                this.emitter.emit(mapFn(x))
            })
        })
    }

    observe(observeFn) {
        this.emitter.on("data", observeFn)
    }
}

module.exports = Stream
const { EventEmitter } = require('events');

class Stream {
    constructor(streamFn) {
        this.streamFn = streamFn
        this.emitter = new EventEmitter()
        this._isFirstCall = true
    }

    map(mapFn) {
        return new Stream(emitter => {
            return this.observe(x => {
                this.emitter.emit(mapFn(x))
            })
        })
    }

    observe(observeFn) {
        if (observeFn.call === undefined)
            throw new Error('observe is not a function')

        this.emitter.on("data", observeFn)

        if (this._isFirstCall) {
            this.streamFn({
                emit: (x) => this.emitter.emit("data", x)
            })
            this._isFirstCall = false
        }
    }
}

module.exports = Stream
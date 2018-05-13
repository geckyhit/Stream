class PullStream {
    constructor(streamFn) {
        this.streamFn = streamFn
    }

    map(mapFn) {
        return new PullStream(cb => {
            this.consume(pull => {
                pull(function next(x) {
                    cb(mapFn(x))
                })
            })
        })
    }

    consume(consumeFn) {
        consumeFn(this.streamFn)
    }
}

module.exports = PullStream
class PushStream {
    constructor(streamFn) {
        this.streamFn = streamFn
    }

    map(mapFn) {
        return new PushStream(observeFn => {
            this.observe(x => {
                observeFn(mapFn(x))
            })
        })
    }

    observe(observeFn) {
        this.streamFn(observeFn)
    }
}


module.exports = PushStream
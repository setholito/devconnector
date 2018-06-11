function getSafe(fn) {
    try {
        return fn()
    } catch (e) {
        return undefined
    }
}

module.exports = {
    getSafe
}

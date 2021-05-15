const SHA256 = require("crypto-js/sha256")

/**
 * sha256算法摘要
 * @param {*} raw
 */
const encode_SHA256 = (raw) => {
    return SHA256(raw).toString()
}

module.exports = {
    encode_SHA256,
}

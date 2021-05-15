const net = require("net")

/**
 * 检查端口占用情况
 */
const ifPortUse = (port) => {
    return new Promise((resolve, reject) => {
        let server = net.createServer().listen(port)
        server.on("listening", () => {
            server.close()
            resolve(port)
        })
        server.on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                resolve(err)
            }
        })
    })
}

const usablePort = async (port) => {
    let res = await ifPortUse(port)
    while (res instanceof Error) {
        port++
        res = await ifPortUse(port)
    }
    return port
}

module.exports = {
    usablePort,
}

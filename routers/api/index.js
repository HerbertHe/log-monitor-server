const { readConfigFile } = require("../../utils/utils")

const regAPIIndex = (routers) => {
    routers.get("/api", async (ctx, next) => {
        const { Copyright } = readConfigFile()
        ctx.body = {
            copy: Copyright,
        }
    })
}

module.exports = {
    regAPIIndex,
}

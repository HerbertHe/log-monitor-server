const { readConfigFile } = require("../../utils/utils")
const { getLogFromPath } = require("../../controllers/logs")

const regAPIIndex = (routers) => {
    routers.get("/api", async (ctx, next) => {
        const { Copyright } = readConfigFile()
        ctx.body = {
            copy: Copyright,
        }
    })
    routers.get("/api/logs", async (ctx, next) => {
        ctx.body = {
            data: getLogFromPath()
        }
    })
}

module.exports = {
    regAPIIndex,
}

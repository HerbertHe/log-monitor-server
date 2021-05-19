const { readConfigFile } = require("../../utils/utils")
const { getLogFromPath } = require("../../controllers/logs")

const regAPIIndex = (routers) => {
    routers.get("/api", async (ctx, next) => {
        const { Copyright } = readConfigFile()
        ctx.body = {
            copy: Copyright,
        }
    })
    routers.get("/api/logs/:mode", async (ctx, next) => {
        const { mode } = ctx.params
        if (!mode) {
            ctx.status = 404
        } else if (mode === "nginx") {
            ctx.body = {
                data: getLogFromPath(mode),
            }
        } else if (mode === "apache") {
            ctx.body = {
                data: getLogFromPath(mode),
            }
        }
    })
}

module.exports = {
    regAPIIndex,
}

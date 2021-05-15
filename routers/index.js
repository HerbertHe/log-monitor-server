const Router = require("koa-router")
const { regAPIIndex } = require("./api")

const { regAPILogin } = require("./api/login")
const { regMainRoutes } = require("./main")

const routers = new Router()

// 注册路由
regMainRoutes(routers)
regAPILogin(routers)
regAPIIndex(routers)

module.exports = routers

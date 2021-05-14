const Router = require("koa-router")

const routers = new Router()

routers.get("/", async (ctx, next) => {
    ctx.body = "Hello World"
})

module.exports = routers

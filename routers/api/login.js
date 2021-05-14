// 登录api
const regAPILogin = (routers) => {
    routers.post("/api/login", async (ctx, next) => {
        ctx.body = {
            err: "ok!",
        }
    })
}

module.exports = {
    regAPILogin,
}

// 登录api
const regAPILogin = (routers) => {
    routers.post("/login", async (ctx, next) => {
        ctx.body = {
            err: "ok!",
        }
    })
}

module.exports = {
    regAPILogin,
}

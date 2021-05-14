const Koa = require("koa")
const app = new Koa()

const routers = require("./routers/index")
const static = require("koa-static")

app.use(static(__dirname, "public"))
app.use(routers.routes())
app.use(routers.allowedMethods())

const port = process.env.LOGM_PORT

app.listen(port, () => {
    console.log(`服务启动端口: ${port}`)
})

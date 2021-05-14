const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")

const { logErrorString, logAdviceString } = require("../utils/index")

const { readConfigFile } = require("../../utils/utils")

const writeNginxConfig = (ssl) => {
    const { Domain } = readConfigFile()
    const cwd = process.cwd()
    let data = ""

    if (!Domain) {
        // Domain没有配置
        return
    }

    if (ssl) {
        // 配置ssl
        data = `server {

        }`
    } else {
        // http协议
    }

    fs.writeFileSync(path.resolve(cwd, "log-monitor.conf"), data, {
        encoding: "utf-8",
    })
}

const copyConfigFile2Nginx = () => {
    let pwd = "/etc/nginx/conf.d"
    let cwd = process.cwd()
    const files = fs.readdirSync(cwd)
    if (!files.includes("log-monitor.conf")) {
        // 不存在配置文件
        console.log(logErrorString("没有找到nginx配置文件 log-monitor.conf"))
        console.log(
            logAdviceString("请执行 logm config nginx 生成nginx配置文件")
        )
        return false
    }

    exec(
        `cp ./log-monitor.conf ${pwd}/log-monitor.conf`,
        (err, stdout, stderr) => {
            if (err) {
                console.error(err)
            }
            console.log(stdout)
            console.log(stderr)
        }
    )

    return true
}

module.exports = { writeNginxConfig, copyConfigFile2Nginx }

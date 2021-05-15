#!/usr/bin/env node
const program = require("commander")
const path = require("path")
const fs = require("fs")
const { exec } = require("child_process")

const { readConfigFile, updateConfigFile } = require("../utils/utils")
const { writeNginxConfig, copyConfigFile2Nginx } = require("./nginx")
const { usablePort } = require("./utils/network")
const { logAdviceString } = require("./utils")

const { version } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../package.json"), {
        encoding: "utf-8",
    })
)

program.name("logm").version(version)

program
    .command("run")
    .description("启动项目")
    .action(async () => {
        const { Port } = readConfigFile()
        const port = await usablePort(Port)

        // 更新不正确的端口配置
        if (port !== Port) {
            updateConfigFile({ key: "Port", value: port })
        }

        process.env.LOGM_PORT = port
        console.log(logAdviceString(`服务端运行: http://127.0.0.1:${port}`))

        exec(
            `node ${path.resolve(__dirname, "../index.js")}`,
            (err, stdout, stderr) => {
                if (err) {
                    console.error(err)
                }
                console.log(stdout)
                console.log(stderr)
            }
        )
    })

program
    .command("config [plat]")
    .description("生成配置文件")
    .option("--ssl [ssl]", "开启配置SSL")
    .action(({ plat, ssl }) => {
        if (!plat || plat === "nginx") {
            writeNginxConfig(ssl)
        }
    })

program
    .command("deploy [plat]")
    .description("部署log监控服务")
    .action(({ plat }) => {
        if (!plat || plat === "nginx") {
            const configFile = copyConfigFile2Nginx()
            if (!configFile) return

            // 执行重启nginx
            exec("nginx -s reload", (err, stdout, stderr) => {
                if (err) {
                    console.error(err)
                }

                console.log(stdout)
                console.log(stderr)
            })
        }
    })

program.parse(process.argv)

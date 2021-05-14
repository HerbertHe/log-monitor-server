#!/usr/bin/env node
const program = require("commander")
const path = require("path")
const { exec } = require("child_process")

const { readConfigFile } = require("../utils/utils")
const { writeNginxConfig, copyConfigFile2Nginx } = require("./nginx")

program.name("logm").version("0.0.1")

program
    .command("run")
    .description("启动项目")
    .action(() => {
        const { Port } = readConfigFile()
        process.env.LOGM_PORT = Port
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

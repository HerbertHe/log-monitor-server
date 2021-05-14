#!/usr/bin/env node
const program = require("commander")
const path = require("path")
const fs = require("fs")
const exec = require("child_process").exec

program
    .command("run")
    .description("启动项目")
    .action(() => {
        const cwd = process.cwd()
        const files = fs.readdirSync(cwd)
        let config = null
        if (files.includes(".logmrc.json")) {
            config = fs.readFileSync(path.resolve(cwd, ".logmrc.json"), {
                encoding: "utf-8",
            })
        } else {
            config = fs.readFileSync(
                path.resolve(__dirname, "../.logmrc.json"),
                {
                    encoding: "utf-8",
                }
            )
        }
        const { Port } = JSON.parse(config)
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

program.version("0.0.1")

program.parse(process.argv)

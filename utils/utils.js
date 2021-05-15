const fs = require("fs")
const path = require("path")

/**
 * 读取配置文件信息
 */
const readConfigFile = () => {
    const cwd = process.cwd()
    const files = fs.readdirSync(cwd)
    let config = null
    if (files.includes(".logmrc.json")) {
        config = fs.readFileSync(path.resolve(cwd, ".logmrc.json"), {
            encoding: "utf-8",
        })
    } else {
        config = fs.readFileSync(path.resolve(__dirname, "../.logmrc.json"), {
            encoding: "utf-8",
        })
    }
    return JSON.parse(config)
}

/**
 * 更新配置文件
 */
const updateConfigFile = ({ key, value }) => {
    const cwd = process.cwd()
    const files = fs.readFileSync(cwd)
    let config = null
    if (files.includes(".logmrc.json")) {
        config = JSON.parse(
            fs.readFileSync(path.resolve(cwd, ".logmrc.json"), {
                encoding: "utf-8",
            })
        )
        config[key] = value
        fs.writeFileSync(
            path.resolve(cwd, ".logmrc.json"),
            JSON.stringify(config),
            {
                encoding: "utf-8",
            }
        )
    } else {
        config = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, "../.logmrc.json"), {
                encoding: "utf-8",
            })
        )
        config[key] = value
        fs.writeFileSync(
            path.resolve(__dirname, ".logmrc.json"),
            JSON.stringify(config),
            {
                encoding: "utf-8",
            }
        )
    }
}

module.exports = {
    readConfigFile,
    updateConfigFile,
}

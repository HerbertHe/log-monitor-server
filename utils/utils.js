const fs = require("fs")
const path = require("path")

/**
 * 深合并
 */
const deepMerge = (preObj, newObj) => {
    let _obj = {}
    for (let item in preObj) {
        if (
            typeof preObj[item] === "object" &&
            !(preObj[item] instanceof Array)
        ) {
            _obj[item] = deepMerge(preObj[item], newObj[item])
            continue
        } else if (!!newObj[item]) {
            _obj[item] = newObj[item]
            continue
        } else {
            _obj[item] = preObj[item]
            continue
        }
    }
    return _obj
}

/**
 * 读取配置文件信息
 */
const readConfigFile = () => {
    const cwd = process.cwd()
    const files = fs.readdirSync(cwd)
    const defaultConfig = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../.logmrc.json"), {
            encoding: "utf-8",
        })
    )

    if (files.includes(".logmrc.json")) {
        const newConfig = JSON.parse(
            fs.readFileSync(path.resolve(cwd, ".logmrc.json"), {
                encoding: "utf-8",
            })
        )
        return deepMerge(defaultConfig, newConfig)
    }

    return defaultConfig
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

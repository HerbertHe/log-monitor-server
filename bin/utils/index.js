const chalk = require("chalk")

/**
 * 生成打印错误字符串信息
 */
const logErrorString = (raw) => {
    return `${chalk.bgRedBright("Error:")} ${chalk.redBright(raw)}`
}

/**
 * 生成建议字符串信息
 */
const logAdviceString = (raw) => {
    return `${chalk.bgGrey("INFO:")} ${chalk.greenBright(raw)}`
}

module.exports = {
    logErrorString,
    logAdviceString,
}

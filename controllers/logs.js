// 处理返回logs数据
const { LogMonitor } = require("@herberthe/log-monitor")
const { readConfigFile } = require("../utils/utils")

const getLogFromPath = () => {
    const { LogPath } = readConfigFile()
    const monitor = new LogMonitor({
        path: LogPath,
    })
    return monitor.export()
}

module.exports = {
    getLogFromPath,
}

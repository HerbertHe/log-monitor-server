// 处理返回logs数据
const LogMonitor = require("@herberthe/log-monitor")
const { readConfigFile } = require("../utils/utils")

const getLogFromPath = () => {
    const { Path } = readConfigFile()
    const monitor = new LogMonitor({
        path: Path,
    })
    return monitor.export()
}

module.exports = {
    getLogFromPath,
}

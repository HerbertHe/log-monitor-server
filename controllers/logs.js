// 处理返回logs数据
const { LogMonitor } = require("@herberthe/log-monitor")
const { readConfigFile } = require("../utils/utils")

const getLogFromPath = (mode) => {
    const { LogPath } = readConfigFile()
    let monitor = null

    // 判断是否是字符串类型
    if (typeof LogPath === "string") {
        monitor = new LogMonitor({
            path: LogPath,
        })
        return monitor.export()
    }

    if (["apache", "nginx"].includes(mode)) {
        const paths = LogPath.filter((item) => !!item[1] && item[1] === mode)
        const monitor = new LogMonitor({
            path: paths[0][0],
            mode: paths[0][1],
        })
        return monitor.export()
    }

    // 判断是否是数组类型
    if (LogPath instanceof Array) {
        const paths = LogPath.filter(
            (item) => !!item[1] && ["nginx", "apache"].includes(item[1])
        )
        const res = paths
            .map((item) => {
                const monitor = new LogMonitor({
                    path: item[0],
                    mode: item[1],
                })
                return monitor.export()
            })
            .flat(Infinity)
        return res
    }
}

module.exports = {
    getLogFromPath,
}

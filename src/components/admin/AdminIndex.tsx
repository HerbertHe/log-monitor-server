import React, { Fragment, useEffect, useState } from "react"

const AdminIndex = () => {
    const [config, setConfig] = useState<Array<any>>([])
    const [serverStatus, setServerStatus] = useState<Array<any>>([])

    useEffect(() => {
        ;(async () => {
            const res = await fetch("/api/config")
            const { data } = await res.json()
            setServerStatus(setLogPath(data))
            setConfig(analysisConfig(data))
        })()
    }, [])

    const analysisConfig = (config: any) => {
        let _config = []
        for (let item in config) {
            if (typeof item === "string" && item !== "LogPath") {
                _config.push([item, config[item]])
            }
        }
        return _config
    }

    const setLogPath = (config: any) => {
        const { LogPath } = config
        if (typeof LogPath === "string" && LogPath.length !== 0) {
            return [
                [LogPath, true],
                ["", false],
            ]
        }

        if (LogPath instanceof Array && LogPath.length !== 0) {
            const paths = LogPath.filter((item: Array<any>) =>
                ["nginx", "apache"].includes(item[1])
            )

            if (paths.length === 1) {
                return [
                    [
                        paths[0][0],
                        paths[0][1] === "nginx" && paths[0][0].length !== 0,
                    ],
                    [
                        paths[0][0],
                        paths[0][1] === "apache" && paths[0][0].length !== 0,
                    ],
                ]
            }

            if (
                paths.length === 2 &&
                paths[0][0].length !== 0 &&
                paths[1][0].length !== 0
            ) {
                return [
                    [paths[0][0], true],
                    [paths[1][0], true],
                ]
            }
        }

        return [
            ["", false],
            ["", false],
        ]
    }

    return (
        <Fragment>
            <main className="w-full">
                <div className="flex flex-row items-center justify-between mb-2">
                    <h1 className="text-xl font-light">控制台</h1>
                </div>
                <hr />

                {serverStatus.length !== 0 && (
                    <ul className="py-4">
                        <li className="p-3">
                            <span className="mr-2 font-bold">
                                Nginx日志目录
                            </span>
                            <span
                                className={`bg-gray-200 p-1 rounded-md ${
                                    !serverStatus[0][1] ? "text-red-600" : ""
                                }`}
                            >
                                {serverStatus[0][1]
                                    ? serverStatus[0][0]
                                    : "未配置"}
                            </span>
                        </li>
                        <li className="p-3">
                            <span className="mr-2 font-bold">
                                Apache日志目录
                            </span>
                            <span
                                className={`bg-gray-200 p-1 rounded-md ${
                                    !serverStatus[1][1] ? "text-red-600" : ""
                                }`}
                            >
                                {serverStatus[1][1]
                                    ? serverStatus[1][0]
                                    : "未配置"}
                            </span>
                        </li>
                    </ul>
                )}
                <details className="select-none px-4 py-2 cursor-pointer bg-gray-200 rounded-md">
                    <summary className="font-bold">配置信息</summary>
                    <ul className="mt-3">
                        {config.length !== 0 &&
                            config.map((item: Array<any>) => (
                                <li key={item[0]} className="my-2">
                                    <span className="mr-2 font-bold">
                                        {item[0]}
                                    </span>
                                    <span
                                        className={`${
                                            !item[1] ? "text-red-600" : ""
                                        }`}
                                    >
                                        {!!item[1] ? item[1] : "未配置"}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </details>
            </main>
        </Fragment>
    )
}

export default AdminIndex

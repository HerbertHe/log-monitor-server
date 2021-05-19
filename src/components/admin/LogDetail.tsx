import React, { Fragment, useEffect, useState } from "react"

interface IAccessLog {
    [index: string]: any
    key?: any
    ip: string
    time: string
    request: string
    status: string
    bytes: string
    referrer: string
    ua: string
    raw: string
}

interface IErrorLog {
    [index: string]: any
    key?: any
    raw: string
    time: string
    level: string
    pid: string
    number: string
    message: string
    client: string
    server: string
    request: string
    upstream: string
    host: string
    referrer: string
}

interface ILogDetail {
    display: boolean
    setDisplay: () => void
    log?: IAccessLog | IErrorLog | undefined
}

// TODO 重构各部分的展示
const LogDetail = ({ display, setDisplay, log }: ILogDetail) => {
    const [AccessLog, setAccessLog] = useState<Array<Array<string>>>([])

    useEffect(() => {
        if (!!log && !!log?.raw) {
            let logs = []
            for (let item in log) {
                if (!["key", "raw"].includes(item)) {
                    logs.push([item, log[item]])
                }
            }
            logs.push(["raw", log["raw"]])
            console.log(logs)
            setAccessLog(logs)
        }
    }, [log])
    return (
        <Fragment>
            {!!log?.raw && (
                <div
                    className="fixed top-0 bottom-0 left-0 right-0 z-50"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: display ? "" : "none",
                    }}
                >
                    <div className="absolute right-0 h-screen w-1/2 bg-white shadow-xl flex flex-col">
                        <header className="px-4 py-3 text-lg">日志详情</header>
                        <hr />
                        <main className="flex-1 overflow-auto px-4 py-5">
                            {AccessLog.map((item: Array<string>) => (
                                <div key={item[0]}>
                                    <div className="font-bold">{item[0]}</div>
                                    <div className="bg-gray-200 w-full p-2 rounded-md mt-2 mb-4 text-sm break-words break-all min-h-9">
                                        {item[1]}
                                    </div>
                                </div>
                            ))}
                        </main>
                        <hr />
                        <footer className="px-4 py-3">
                            <button
                                className="bg-black text-white px-4 py-2 rounded-md"
                                onClick={() => setDisplay()}
                            >
                                关闭
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default LogDetail

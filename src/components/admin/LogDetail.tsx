import React, { Fragment, useEffect, useState } from "react"

interface IAccessLog {
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
    key?: any
    raw: string
}

interface ILogDetail {
    display: boolean
    setDisplay: () => void
    log?: IAccessLog | IErrorLog | undefined
}

const LogDetail = ({ display, setDisplay, log }: ILogDetail) => {
    const [AccessLog, setAccessLog] = useState([{}])
    const [UA, setUA] = useState("")
    const [Raw, setRaw] = useState("")

    useEffect(() => {
        if (!!log && !!log?.raw) {
            const { ip, time, request, status, bytes, referrer, ua, raw } =
                log as IAccessLog
            const detail = [
                { id: "IP", value: ip },
                { id: "时间", value: time },
                { id: "请求", value: request },
                { id: "状态", value: status },
                { id: "Bytes", value: bytes },
                { id: "Referrer", value: referrer },
            ]
            setAccessLog(detail)
            setRaw(raw)
            setUA(ua)
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
                            {AccessLog.map((item: any) => (
                                <Fragment key={item.id}>
                                    <label htmlFor={item.id}>{item.id}</label>
                                    <input
                                        id={item.id}
                                        className="outline-none bg-gray-200 w-full p-2 rounded-md mt-2 mb-4 text-sm"
                                        value={item.value}
                                        readOnly
                                    />
                                </Fragment>
                            ))}
                            <label htmlFor="UA">UA</label>
                            <textarea
                                id="UA"
                                rows={4}
                                className="outline-none bg-gray-200 w-full p-2 rounded-md mt-2 mb-4 text-sm resize-none"
                                readOnly
                                value={UA}
                            />
                            <label htmlFor="日志详情">日志详情</label>
                            <textarea
                                id="日志详情"
                                rows={6}
                                className="outline-none bg-gray-200 w-full p-2 rounded-md mt-2 mb-4 text-sm resize-none"
                                readOnly
                                value={Raw}
                            />
                        </main>
                        <hr />
                        <footer className="px-4 py-2">
                            <button
                                className="bg-black text-white px-3 py-1"
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

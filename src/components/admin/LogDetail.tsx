import React, { Fragment, useEffect } from "react"

const AccessLogs = [
    { id: "IP", value: `175.44.42.243` },
    { id: "时间", value: "13/May/2021:09:35:31 +0800" },
    { id: "请求", value: "GET / HTTP/1.1" },
    { id: "状态", value: "200" },
    { id: "code", value: "790" },
    { id: "消息", value: "http://wdzs.aucoinhomes.com/" },
]

interface IAccessLog {
    ip: string
    time: string
    request: string
    status: string
    code: string
    message: string
    ua: string
    raw: string
}

interface IErrorLog {}

interface ILogDetail {
    display: boolean
    setDisplay: () => void
    log?: IAccessLog | IErrorLog
}

const LogDetail = ({ display, log }: ILogDetail) => {
    useEffect(() => {
        // 在此给具体内容赋值
    }, [])
    return (
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
                    {AccessLogs.map((item: any) => (
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
                        value={`Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1`}
                    />
                    <label htmlFor="日志详情">日志详情</label>
                    <textarea
                        id="日志详情"
                        rows={6}
                        className="outline-none bg-gray-200 w-full p-2 rounded-md mt-2 mb-4 text-sm resize-none"
                        readOnly
                        value={`175.44.42.243 - - [13/May/2021:09:35:31 +0800] "GET / HTTP/1.1" 200 790 "http://wdzs.aucoinhomes.com/" "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1`}
                    />
                </main>
                <hr />
                <footer className="px-4 py-2">
                    <button className="bg-black text-white px-3 py-1">
                        关闭
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default LogDetail

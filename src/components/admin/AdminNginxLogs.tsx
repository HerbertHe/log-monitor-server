import React, { useEffect, useState, Fragment } from "react"
import { Table } from "antd"

import LogDetail from "./LogDetail"

const AdminNginxLogs = () => {
    const [showDetail, setShowDetail] = useState(false)
    const [detail, setDetail] = useState(undefined)
    const [col, setCol] = useState([])
    const [files, setFiles] = useState([])
    const [logType, setLogType] = useState("access")
    const [dataSrc, setDataSrc] = useState([])

    useEffect(() => {
        ;(async () => {
            const res = await fetch("/api/logs")
            const result = await res.json()
            const { data } = result
            if (data.length !== 0) {
                setFiles(data)
                const datas = transAccessLog(data[0])
                setDataSrc(datas)
            }
            const cols = transCols(data[0])
            setCol(cols)
        })()
    }, [])

    const transCols = (data: any) => {
        const cols = data.logs.labels.map((item: string) => {
            if (["ua", "message", "request"].includes(item)) {
                return {
                    title: item.toUpperCase(),
                    dataIndex: item,
                    key: item,
                    ellipsis: true,
                }
            }

            return {
                title: item.toUpperCase(),
                dataIndex: item,
                key: item,
            }
        })
        cols.shift()
        cols.push({
            title: "Detail",
            key: "detail",
            fixed: "right",
            width: 100,
            render: (text: any) => (
                <a
                    className="select-none"
                    onClick={() => {
                        openDetail(text)
                    }}
                >
                    详情
                </a>
            ),
        })
        return cols
    }

    const getErrorShort = (text: string) => {
        const regex = /[a-z]+:\s*([\s\S]+)/
        const res = regex.exec(text)
        if (!!res) {
            return res[1]
        } else {
            return text
        }
    }

    const transAccessLog = (data: any) => {
        setLogType(data.type)
        const datas = data.logs.content
            .filter((item: any) => !!item)
            .map((item: any, index: number) => {
                return {
                    key: index,
                    raw: item[0],
                    ip: item[1].trim(),
                    time: item[2].substr(-14, 8),
                    request: item[3],
                    status: item[4],
                    bytes: item[5],
                    referrer: item[6],
                    ua: item[7],
                }
            })
        return datas
    }
    const transErrorLog = (data: any) => {
        setLogType(data.type)
        const datas = data.logs.content
            .filter((item: any) => !!item)
            .map((item: any, index: number) => {
                return {
                    key: index,
                    raw: item[0],
                    time: item[1].substr(-8, 8),
                    level: item[2],
                    pid: item[3].split("#")[0],
                    number: item[4],
                    message: item[5],
                    client: getErrorShort(item[6]),
                    server: getErrorShort(item[7]),
                    request: getErrorShort(item[8]),
                    upstream: getErrorShort(item[9]),
                    host: getErrorShort(item[10]),
                    referrer: getErrorShort(item[11]),
                }
            })
        return datas
    }

    const updateData = (e: any) => {
        const data = files.filter(
            (item: any) => item.from === e.target.value
        )[0] as any
        setCol(transCols(data))
        if (data.type === "access") {
            setDataSrc(transAccessLog(data))
        } else {
            setDataSrc(transErrorLog(data))
        }
    }

    const openDetail = (text: any) => {
        setDetail(text)
        setShowDetail(true)
    }

    return (
        <Fragment>
            <main className="w-full">
                <div className="flex flex-row items-center justify-between mb-2">
                    <h1 className="text-xl font-light">今日日志详情</h1>
                    <span>
                        日志类型
                        <span className="pl-1 font-semibold">
                            {logType.toUpperCase()}
                        </span>
                    </span>
                    <span>
                        当前文件日志量
                        <span className="pl-1 font-semibold">
                            {dataSrc.length}
                        </span>
                    </span>
                    <select
                        className="mt-2 bg-gray-100 p-2 outline-none cursor-pointer"
                        onChange={(e) => updateData(e)}
                        defaultValue={files[0]}
                    >
                        {files.length !== 0 &&
                            files.map((item: any) => (
                                <option
                                    value={item.from}
                                    key={item.from}
                                    className="cursor-pointer"
                                >
                                    {item.from}
                                </option>
                            ))}
                    </select>
                </div>
                <hr />

                {col.length !== 0 && (
                    <Table columns={col} dataSource={dataSrc} size="middle" />
                )}
            </main>
            <LogDetail
                display={showDetail}
                log={detail}
                setDisplay={() => setShowDetail(!showDetail)}
            />
        </Fragment>
    )
}

export default AdminNginxLogs

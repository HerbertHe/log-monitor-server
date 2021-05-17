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
                const datas = transContent(data[0])
                setDataSrc(datas)
            }
            const cols = transCols(data[0])
            setCol(cols)
        })()
    }, [])

    const transCols = (data: any) => {
        const cols = data.logs.labels.map((item: string) => {
            if (item === "ua") {
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

    const transContent = (data: any) => {
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
                    code: item[5],
                    url: item[6],
                    ua: item[7],
                }
            })
        return datas
    }

    const updateData = (e: any) => {
        const data = files.filter(
            (item: any) => item.from === e.target.value
        )[0] as any
        setCol(transCols(data))
        setDataSrc(transContent(data))
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

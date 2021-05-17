import React, { useEffect, useState, Fragment } from "react"
import { Table } from "antd"

import LogDetail from "./LogDetail"

const AdminNginxLogs = () => {
    const [showDetail, setShowDetail] = useState(false)
    const [detail, setDetail] = useState(undefined)
    const [col, setCol] = useState([])
    const [dataSrc, setDataSrc] = useState([])

    useEffect(() => {
        ;(async () => {
            const res = await fetch("/api/logs")
            const result = await res.json()
            const { data } = result
            if (data.length !== 0) {
                const datas = data[0].logs.content
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
                setDataSrc(datas)
            }
            const cols = data[0].logs.labels.map((item: string) => {
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
            setCol(cols)
        })()
    }, [])

    const updateData = () => {
        console.log("触发数据更新")
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
                        当前文件日志量
                        <span className="pl-1 font-semibold">
                            {dataSrc.length}
                        </span>
                    </span>
                    <select
                        className="mt-2 bg-gray-100 p-2 outline-none cursor-pointer"
                        onChange={() => updateData()}
                        defaultValue="access.logs"
                    >
                        <option value="access.log">access.log</option>
                    </select>
                </div>
                <hr />

                <Table columns={col} dataSource={dataSrc} size="middle" />
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

import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import AdminAbout from "../components/admin/AdminAbout"
import AdminIndex from "../components/admin/AdminIndex"
import AdminNginxLogs from "../components/admin/AdminNginxLogs"

const Links = [
    {
        to: "/admin/index",
        name: "控制台",
    },
    {
        to: "/admin/nginx-logs",
        name: "NGINX日志数据",
    },
    {
        to: "/admin/about",
        name: "关于",
    },
]

const Admin = (props: any) => {
    const [domPage, setDomPage] = useState("index")
    useEffect(() => {
        const { page } = props.match.params
        if (!!page) {
            setDomPage(props.match.params.page)
        }
    }, [])
    return (
        <div className="w-full">
            <header className="h-16 shadow-lg fixed left-0 right-0 flex flex-row justify-between items-center px-5">
                <div className="flex flex-row items-center">
                    <img
                        src="/imgs/golk.svg"
                        alt="golk"
                        width="35"
                        height="35"
                    />
                    <span className="ml-3 font-light text-xl">
                        Golk日志监控服务
                    </span>
                </div>
                <div>设置 | 注销</div>
            </header>
            <main className="flex flex-row justify-start items-start h-screen w-full pt-16">
                <ul className="h-full bg-gray-200 w-52 shadow-lg py-5 overflow-auto">
                    {Links.map((item: any) => (
                        <li
                            key={item.name}
                            className="px-4 hover:bg-gray-300 py-2 cursor-pointer"
                            style={{
                                backgroundColor:
                                    domPage === item.to.split("/")[2]
                                        ? "#d9d9d9"
                                        : "",
                            }}
                        >
                            <Link
                                to={item.to}
                                className="w-full block"
                                onClick={() => {
                                    setDomPage(item.to.split("/")[2])
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="h-full flex-1 ml-3 p-5 overflow-auto shadow-lg">
                    {domPage === "index" && <AdminIndex />}
                    {domPage === "nginx-logs" && <AdminNginxLogs />}
                    {domPage === "about" && <AdminAbout />}
                </div>
            </main>
        </div>
    )
}

export default Admin

import React from "react"

import {
    name,
    version,
    license,
    author,
    dependencies,
    devDependencies,
    repository,
} from "../../../package.json"

const Items = [
    {
        name: "项目名称",
        content: `${name}  Ver.${version}`,
    },
    {
        name: "作者",
        content: author,
    },
    {
        name: "许可证",
        content: license,
    },
    {
        name: "项目仓库",
        content: repository,
    },
    // {
    //     name: "开发依赖",
    //     content: devDependencies,
    // },
    // {
    //     name: "项目依赖",
    //     content: dependencies,
    // },
]

const AdminAbout = () => {
    return (
        <div>
            <div className="flex flex-row items-center mb-5">
                <img src="/imgs/golk.png" width="100" alt="golk" />
                <span className="text-3xl font-light">Golk日志监控服务</span>
            </div>
            <ul className="flex flex-col">
                {Items.map((item: any) => (
                    <li key={item.name} className="py-1">
                        <div>
                            <span>{item.name}: </span>
                            <span>{item.content}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminAbout

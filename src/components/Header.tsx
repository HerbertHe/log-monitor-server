import React from "react"

const Header = () => (
    <div className="z-50 fixed left-0 right-0 h-16 px-5 bg-white text-black flex flex-row justify-start items-center shadow-md w-screen">
        <img
            src="/imgs/golk.svg"
            alt="golk"
            width="40"
            height="40"
            className="p-0 m-0"
        />
        <span className="font-bold font-serif text-lg">
            日志监控系统 | Log Monitor
        </span>
    </div>
)

export default Header

import React from "react"

const LoginBox = () => {
    return (
        <div className="flex flex-col justify-center items-center flex-1">
            <div className="rounded-lg shadow-2xl w-1/2 p-8 flex flex-col">
                <label className="mt-3" htmlFor="username">
                    用户名 Username
                </label>
                <input
                    className="bg-gray-100 mt-2 p-2"
                    id="username"
                    type="text"
                    placeholder="UserName"
                />
                <label className="mt-5" htmlFor="password">
                    密码 Password
                </label>
                <input
                    className="bg-gray-100 mt-2 p-2"
                    id="password"
                    type="password"
                    placeholder="Password"
                />
                <button className="bg-black mt-8 py-2 text-white rounded-md">登录</button>
            </div>
        </div>
    )
}

export default LoginBox

import React, { useEffect, useState } from "react"
import { version } from "../../package.json"

const Footer = () => {
    const [copy, setCopy] = useState(null)
    useEffect(() => {
        ;(async () => {
            const res = await fetch("/api/")
            const result = await res.json()
            setCopy(result.copy)
        })()
    }, [])
    return (
        <div className="bg-white w-full p-5 mt-7 border border-gray-300 flex flex-col justify-items-center items-center">
            <div className="text-sm">&copy; {copy}</div>
            <div className="text-sm my-1">
                Powered By
                <a
                    className="font-bold mx-1"
                    href="https://github.com/HerbertHe/log-monitor"
                >
                    Log Monitor
                </a>
                Version.{version}
            </div>
        </div>
    )
}

export default Footer

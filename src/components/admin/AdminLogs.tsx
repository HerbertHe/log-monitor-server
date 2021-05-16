import React, { useEffect } from "react"
import LogDetail from "./LogDetail"

const AdminLogs = () => {
    useEffect(() => {
        ;(async () => {
            const res = await fetch("/api/logs")
            const result = await res.json()
            console.log(result)
        })()
    }, [])
    return <LogDetail display={true} setDisplay={() => {}} />
}

export default AdminLogs

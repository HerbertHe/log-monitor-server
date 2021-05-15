import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import LoginBox from "../components/LoginBox"
import Powered from "../components/Powered"

const Home = () => (
    <div className="w-full">
        <Header />
        <main className="min-h-screen pt-40 flex flex-col">
            <div className="w-full flex flex-row">
                <div className="flex-1 flex flex-row justify-center items-center">
                    <img src="/imgs/golk.svg" width="200" height="200" />
                    <h1 className="font-thin text-4xl">Golk日志监控服务</h1>
                </div>
                <LoginBox />
            </div>
            <Powered />
        </main>
        <Footer />
    </div>
)

export default Home

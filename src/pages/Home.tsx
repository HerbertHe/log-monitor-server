import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Powered from "../components/Powered"

const Home = () => (
    <div>
        <Header />
        <main className="min-h-screen pt-20">
            <Powered />
        </main>
        <Footer />
    </div>
)

export default Home

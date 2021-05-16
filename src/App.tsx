import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Home from "./pages/Home"
import Admin from "./pages/Admin"

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Home}></Route>
            <Route path="/admin/:page?" component={Admin}></Route>
        </Router>
    )
}

export default App

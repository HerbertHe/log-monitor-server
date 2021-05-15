import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"

const App = () => {
    return (
        <Router>
            <Route path="/" exact>
                <Home />
            </Route>
        </Router>
    )
}

export default App

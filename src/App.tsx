import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import { HomeScreen, EditScreen, CreateScreen } from "./screens";

const REACT_ENV: string = process.env.REACT_ENV || "production";

console.log(REACT_ENV);

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                {REACT_ENV !== "production" && <span>dev-mode</span>}
                <h1 className="app-title">TODOrial</h1>

                <div className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/create">Criar</Link>
                </div>
                <Switch>
                    <Route path="/create">
                        <CreateScreen />
                    </Route>
                    <Route path="/:id/edit">
                        <EditScreen />
                    </Route>
                    <Route path="/">
                        <HomeScreen />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;

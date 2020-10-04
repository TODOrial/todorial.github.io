import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import { HomeScreen, EditScreen, CreateScreen } from "./screens";

const REACT_ENV: string = process.env.REACT_ENV || "production";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                {REACT_ENV !== "production" && <span>dev-mode</span>}
                <h1 className="app-title">TODOrial</h1>

                <div className="navbar">
                    <Link to="/">Tarefas</Link>
                    <Link to="/create">Adicionar Tarefa</Link>
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
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </BrowserRouter>
        </div>
    );
}

export default App;

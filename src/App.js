import React from "react";
import Navbar from "./components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppRouter from "./routers/AppRouter";
import "./App.css";

export default class App extends React.Component {
    render() {
        return (
            <div className="App container">
                <CssBaseline>
                    <Navbar />
                    <AppRouter />
                </CssBaseline>
            </div>
        );
    }
}

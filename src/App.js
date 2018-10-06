import React from "react";
import Navbar from "./components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppRouter from "./routers/AppRouter";
import "./App.css";
import { Auth } from "aws-amplify";
import SnackbarNotifier, { openSnackbar } from "./components/SnackbarNotifier";
import { withRouter } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true
        };
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    };

    handleLogout = async event => {
        console.log("werkin");
        await Auth.signOut();
        this.userHasAuthenticated(false);
        this.props.history.push("/signin");
    };

    async componentDidMount() {
        try {
            if (await Auth.currentSession()) {
                this.userHasAuthenticated(true);
            }
        } catch (e) {
            if (e !== "No current user") {
                openSnackbar({ message: e, variant: "warning" });
            }
        }
        this.setState({ isAuthenticating: false });
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            handleLogout: this.handleLogout
        };

        return (
            !this.state.isAuthenticating && (
                <div className="App container">
                    <CssBaseline>
                        <Navbar childProps={childProps} />
                        <AppRouter childProps={childProps} />
                        <SnackbarNotifier />
                    </CssBaseline>
                </div>
            )
        );
    }
}

export default withRouter(App);

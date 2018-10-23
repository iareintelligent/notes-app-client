import React from "react";
import Navbar from "./components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppRouter from "./routers/AppRouter";
import "./App.css";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import Footer from "./containers/Footer";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true
        };
    }

    async componentDidMount() {
        try {
            if (await Auth.currentSession()) {
                this.userHasAuthenticated(true);
            }
        } catch (e) {
            if (e !== "No current user") {
                alert(e);
            }
        }
        this.setState({ isAuthenticating: false });
    }

    userHasAuthenticated = (authenticated = false) => {
        this.setState({ isAuthenticated: authenticated });
    };

    handleLogout = async event => {
        await Auth.signOut();
        this.userHasAuthenticated(false);
        this.props.history.push("/signin");
    };

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            handleLogout: this.handleLogout
        };

        return (
            !this.state.isAuthenticating && (
                <MuiThemeProvider theme={theme}>
                    <CssBaseline>
                        <Navbar childProps={childProps} />
                        <AppRouter childProps={childProps} />
                        <Footer {...childProps} />
                    </CssBaseline>
                </MuiThemeProvider>
            )
        );
    }
}

export default withRouter(App);

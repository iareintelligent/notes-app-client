import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RootRef from "@material-ui/core/RootRef";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountBox from "@material-ui/icons/AccountBox";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    appBar: {
        marginTop: 0
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        color: theme.palette.light
    },
    navbarBrand: {
        textDecoration: "none",
        display: "inline-block",
        paddingTop: ".3125rem",
        paddingBottom: ".3125rem",
        marginRight: "1rem",
        fontSize: "1.25rem",
        lineHeight: "inherit",
        whiteSpace: "nowrap"
    },
    navbarBrandH2: {
        color: "white",
        fontWeight: "bold"
    }
});

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.navRef = React.createContext();
        this.state = {
            height: this.height
        };
    }

    adjustNavPadding = () => {
        const height = this.navRef.current.clientHeight;
        this.setState({ height: height });
    };

    componentDidMount() {
        this.adjustNavPadding();
    }

    render() {
        const { childProps } = this.props;
        return (
            <React.Fragment>
                <RootRef rootRef={this.navRef}>
                    <AppBar
                        className={this.props.classes.appBar}
                        color="secondary"
                    >
                        <Toolbar>
                            <Link
                                to="/"
                                className={this.props.classes.navbarBrand}
                            >
                                <Typography
                                    variant="h6"
                                    className={this.props.classes.navbarBrandH2}
                                >
                                    Scratch
                                </Typography>
                            </Link>
                            <div className={this.props.classes.grow} />
                            {childProps.isAuthenticated ? (
                                <Button
                                    style={{ color: "white" }}
                                    onClick={childProps.handleLogout}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <React.Fragment>
                                    <IconButton
                                        className={
                                            this.props.classes.menuButton
                                        }
                                        aria-label="sign in"
                                        component={Link}
                                        to="/signin"
                                    >
                                        <AccountBox />
                                    </IconButton>
                                    <Typography variant="srOnly">
                                        Sign up or Log in
                                    </Typography>
                                </React.Fragment>
                            )}
                        </Toolbar>
                    </AppBar>
                </RootRef>
                <div
                    className="navSpacer"
                    style={{ height: this.state.height }}
                />
            </React.Fragment>
        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);

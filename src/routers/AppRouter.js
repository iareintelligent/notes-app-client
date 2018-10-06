import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "../components/AppliedRoute";
import Home from "../containers/Home";
import Signin from "../containers/Signin";
import FourOhFour from "../containers/FourOhFour";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
    paper: {
        backgroundSize: "1.5rem 1.5rem",
        backgroundImage:
            "linear-gradient(to right, #93FDFE 1px, transparent 1px), linear-gradient(to bottom, #93FDFE 1px, transparent 1px)",
        overflow: "scroll",
        height: "80vh"
    }
};

class AppRouter extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }
    render() {
        const { classes, childProps } = this.props;
        return (
            <Paper className={classes.paper}>
                <Switch>
                    <AppliedRoute
                        path="/"
                        exact
                        component={Home}
                        props={childProps}
                    />
                    <AppliedRoute
                        path="/signin"
                        component={Signin}
                        props={childProps}
                    />
                    <AppliedRoute component={FourOhFour} />
                </Switch>
            </Paper>
        );
    }
}

AppRouter.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppRouter);

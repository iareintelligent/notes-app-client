import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "../components/AppliedRoute";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";
import Home from "../containers/Home";
import Signin from "../containers/AccountContainer";
import FourOhFour from "../containers/FourOhFour";
import CreateNote from "../containers/CreateNote";
import Notes from "../containers/Notes";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
    paper: {
        backgroundSize: "1.5rem 1.5rem",
        backgroundImage:
            "linear-gradient(to right, #93FDFE 1px, transparent 1px), linear-gradient(to bottom, #93FDFE 1px, transparent 1px)",
        overflow: "scroll",
        height: "80vh",
        padding: theme.spacing.unit
    }
});

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
                    <UnauthenticatedRoute
                        path="/signin"
                        component={Signin}
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        path="/notes/new"
                        exact
                        component={CreateNote}
                        props={childProps}
                    />
                    <AuthenticatedRoute
                        path="/notes/:id"
                        exact
                        component={Notes}
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

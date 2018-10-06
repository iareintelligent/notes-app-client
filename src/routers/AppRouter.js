import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "../components/AppliedRoute";
import Home from "../containers/Home";
import Signin from "../containers/Signin";
import FourOhFour from "../containers/FourOhFour";

export default ({ childProps }) => {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} props={childProps} />
            <AppliedRoute
                path="/signin"
                component={Signin}
                props={childProps}
            />
            <AppliedRoute component={FourOhFour} />
        </Switch>
    );
};

import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home";
import Signup from "../containers/Signup";
import Signin from "../containers/Signin";
import FourOhFour from "../components/FourOhFour";

export default () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route component={FourOhFour} />
        </Switch>
    );
};

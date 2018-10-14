import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const styles = {
    Home: {
        textAlign: "center"
    },
    lander: {
        padding: "80px 0",
        textAlign: "center"
    },
    landerH1: {
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: "600"
    },
    landerP: {
        color: "#999"
    }
};

class Home extends React.PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.Home}>
                <div className={classes.lander}>
                    <Typography
                        variant="h6"
                        component="h1"
                        className={classes.landerH1}
                    >
                        Scratch
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        className={classes.landerP}
                    >
                        A simple note-taking app
                    </Typography>
                </div>
                <Button variant="text" color="primary" href="/notes/new">
                    Create a Note
                </Button>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

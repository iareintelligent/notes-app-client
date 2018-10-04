import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
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
        return (
            <div className="Home">
                <div className={this.props.classes.lander}>
                    <Typography
                        variant="title"
                        component="h1"
                        className={this.props.classes.landerH1}
                    >
                        Scratch
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        className={this.props.classes.landerP}
                    >
                        A simple note-taking app
                    </Typography>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

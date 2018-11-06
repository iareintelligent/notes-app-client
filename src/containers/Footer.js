import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const styles = theme => ({
    Footer: {
        display: "flex"
    },
    lander: {
        padding: theme.spacing.unit,
        display: "flex",
        flexDirection: "column",
        width: "50%",
        justifyContent: "center"
    },
    landerH1: {
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: "600"
    },
    landerP: {
        color: "#999"
    }
});

class Footer extends React.PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.Footer}>
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
                    <Typography variant="caption" component="p">
                        ver 0.4
                    </Typography>
                </div>
                {this.props.isAuthenticated && (
                    <div className={classes.lander}>
                        <Button
                            aria-label="create note"
                            component={Link}
                            to="/notes/new"
                            variant="extendedFab"
                            color="secondary"
                            className={classes.addButton}
                        >
                            <AddIcon className={classes.extendedIcon} />
                            Create note
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);

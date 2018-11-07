import React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        background: "rgba(255, 255, 255, .75)",
        padding: theme.spacing.unit,
        minHeight: "45vh",
        maxHeight: "75vh",
        overflow: "scroll",
        border: "1px solid rgba(0, 0, 0, .54)",
        position: "relative"
    },
    label: {
        position: "absolute",
        background: "rgba(255, 255, 255, .74)",
        transform: "translate(15px, -25px)",
        textAlign: "center",
        padding: theme.spacing.unit
    }
});

class BorderedEndlessScrollField extends React.Component {
    render() {
        const { classes, content, label } = this.props;
        return (
            <Paper className={classes.root}>
                <Typography
                    color="textPrimary"
                    variant="button"
                    className={classes.label}
                >
                    {label}
                </Typography>
                {content}
            </Paper>
        );
    }
}

BorderedEndlessScrollField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BorderedEndlessScrollField);

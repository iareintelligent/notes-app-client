import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    }
});

class Note extends React.PureComponent {
    render() {
        const { note, classes } = this.props;
        return (
            <Card>
                <CardContent>
                    <Typography variant="body2">
                        {note.content.trim().split("\n")[0]}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => {}}
                    >
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                </CardContent>
            </Card>
        );
    }
}

Note.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Note);

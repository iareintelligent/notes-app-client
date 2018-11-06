import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    card: {
        margin: theme.spacing.unit
    },
    cardContent: {
        display: "flex",
        alignItems: "center",
        position: "relative"
    },
    IconButton: {
        margin: theme.spacing.unit,
        height: "100%",
        width: "50px",
        position: "relative"
    },
    grow: {
        flexGrow: 1
    }
});

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = event => {
        event.persist();
        this.props.handleDelete(event);
    };

    render() {
        const { note, classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="body1">
                        {note.content.trim().split("\n")[0]}
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        className={classes.IconButton}
                        id={note.noteId}
                        onClick={this.handleDelete}
                    >
                        <DeleteIcon
                            className={classes.rightIcon}
                            color="secondary"
                        />
                    </IconButton>
                    <IconButton
                        className={classes.IconButton}
                        aria-label="edit note"
                        component={Link}
                        to={`/notes/${note.noteId}`}
                    >
                        <EditIcon
                            className={classes.rightIcon}
                            color="primary"
                        />
                    </IconButton>
                </CardContent>
            </Card>
        );
    }
}

Note.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Note);

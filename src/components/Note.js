import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
    card: {
        margin: theme.spacing.unit
    },
    cardContent: {
        display: "flex",
        alignItems: "center",
        position: "relative"
    },
    buttonBase: {
        margin: theme.spacing.unit,
        height: "100%",
        width: "50px",
        position: "relative"
    },
    grow: {
        flexGrow: 1
    }
});

class Note extends React.PureComponent {
    constructor(props) {
        super(props);

        this.deleteNote = this.deleteNote.bind(this);
    }
    deleteNote(event) {
        console.log(event.id)
        this.props.deleteNote(event.id);
    }
    render() {
        const { note, classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="button">
                        {note.content.trim().split("\n")[0]}
                    </Typography>
                    <div className={classes.grow} />
                    <ButtonBase
                        className={classes.buttonBase}
                        id={note.id}
                        onClick={this.deleteNote}
                    >
                        <DeleteIcon
                            className={classes.rightIcon}
                            color="secondary"
                        />
                    </ButtonBase>
                    <ButtonBase
                        className={classes.buttonBase}
                        aria-label="edit note"
                        component={Link}
                        to={`/notes/${note.noteId}`}
                    >
                        <EditIcon
                            className={classes.rightIcon}
                            color="primary"
                        />
                    </ButtonBase>
                </CardContent>
            </Card>
        );
    }
}

Note.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Note);

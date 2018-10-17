import React from "react";
import Note from "./Note";
import Slide from "@material-ui/core/Slide";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { API } from "aws-amplify";

const styles = theme => ({
    note: {
        margin: theme.spacing.unit
    }
});

class NotesList extends React.Component {
    deleteNote = async (id = null) => {
        try {
            API.del("notes", `notes/${id}`);
        } catch (error) {
            alert(error);
        }
    };
    render() {
        const { notes, classes } = this.props;
        return [{}].concat(notes).map(
            (note, i) =>
                i !== 0 ? (
                    <Slide
                        direction="right"
                        mountOnEnter
                        unmountOnExit
                        in
                        style={{ transitionDelay: i * 100 }}
                        key={i}
                    >
                        <Note
                            note={note}
                            className={classes.note}
                            deleteNote={this.deleteNote}
                        />
                    </Slide>
                ) : (
                    ""
                )
        );
    }
}
NotesList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotesList);

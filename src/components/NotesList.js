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
    constructor(props) {
        super(props);

        this.state = {
            isDeleting: false,
            notes: this.props.notes.map(note => {
                return note.noteId;
            })
        };
    }

    removeNote(id) {
        this.setState({
            notes: this.state.notes.filter(note => {
                return note !== id;
            })
        });
    }

    deleteNote(event) {
        return API.del("notes", `/notes/${event.currentTarget.id}`);
    }

    handleDelete = async event => {
        const id = event.currentTarget.id;
        this.removeNote(id);
        this.setState({ isDeleting: true });
        try {
            await this.deleteNote(event);
        } catch (error) {
            console.log(error);
        }
        this.setState({ isDeleting: false });
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
                        style={{ transitionDelay: i * 100 }}
                        key={note.noteId}
                        in={
                            this.state.notes.indexOf(note.noteId) === -1
                                ? false
                                : true
                        }
                    >
                        <Note
                            note={note}
                            className={classes.note}
                            handleDelete={this.handleDelete}
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

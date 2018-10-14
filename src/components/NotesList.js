import React from "react";
import Note from "./Note";

export default class NotesList extends React.Component {
    render() {
        const { notes } = this.props;
        return [{}]
            .concat(notes)
            .map((note, i) => (i !== 0 ? <Note note={note} key={i} /> : ""));
    }
}

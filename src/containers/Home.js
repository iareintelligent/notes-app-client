import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import NotesList from "../components/NotesList";
import { API } from "aws-amplify";

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
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            notes: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const notes = await this.notes();
            this.setState({ notes });
        } catch (error) {
            alert(error);
        }

        this.setState({ isLoading: false });
    }

    notes() {
        return API.get("notes", "/notes");
    }

    renderLander() {
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
            </div>
        );
    }
    renderNotes() {
        return (
            <div className="Notes">
                <Typography variant="h4" component="h1">
                    Your Notes:
                </Typography>
                <Divider />
                {!this.state.isLoading && (
                    <NotesList notes={this.state.notes} />
                )}
            </div>
        );
    }
    render() {
        return (
            <div>
                <Button variant="text" color="primary" href="/notes/new">
                    Create a Note
                </Button>
                {this.state.notes.length > 0
                    ? this.renderNotes()
                    : this.renderLander()}
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

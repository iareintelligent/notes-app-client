import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import NotesList from "../components/NotesList";
import { API } from "aws-amplify";
import BorderedEndlessScrollField from "../components/BorderedEndlessScrollField";
import { Link } from "react-router-dom";

const styles = theme => ({
    Home: {
        textAlign: "center"
    },
    container: {
        marginTop: theme.spacing.unit * 2
    },
    extendedIcon: {
        marginRight: theme.spacing.unit
    },
    addButton: {
        margin: theme.spacing.unit
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
});

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
                    <Button
                        aria-label="Sign in"
                        component={Link}
                        to="/signin"
                        color="secondary"
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        );
    }
    renderNotes() {
        const notes = (
            <React.Fragment>
                {!this.state.isLoading && (
                    <NotesList notes={this.state.notes} />
                )}
            </React.Fragment>
        );
        return (
            <BorderedEndlessScrollField content={notes} label={"Your Notes"} />
        );
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
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

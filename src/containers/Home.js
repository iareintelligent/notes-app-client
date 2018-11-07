import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import NotesList from "../components/NotesList";
import { API } from "aws-amplify";
import BorderedEndlessScrollField from "../components/BorderedEndlessScrollField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
    Home: {
        textAlign: "center",
        maxHeight: "100%"
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
        textAlign: "center",
        maxHeight: "100%"
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
            await this.notes();
        } catch (error) {
            alert(error);
        }

        this.setState({ isLoading: false });
    }

    notes() {
        API.get("notes", "/notes")
            .then(data => {
                this.setState({ notes: data });
            })
            .catch(err => console.log(err));
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
                    {(!this.props.isAuthenticated && (
                        <Button
                            aria-label="Sign in"
                            component={Link}
                            to="/signin"
                            color="secondary"
                        >
                            Sign In
                        </Button>
                    )) || (
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
            </div>
        );
    }
    renderNotes() {
        const { classes } = this.props;
        const notes = (
            <div className={classes.Home}>
                {!this.state.isLoading && (
                    <NotesList notes={this.state.notes} />
                )}
            </div>
        );
        return (
            <BorderedEndlessScrollField
                content={notes}
                label={"Your Notes"}
                className={classes.maxHeight}
            />
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

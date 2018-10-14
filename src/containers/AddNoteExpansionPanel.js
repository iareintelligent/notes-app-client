import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AddEventForm from "./AddEventForm";
import { addEvent } from "../actions/events";
import {
    Button,
    Toolbar,
    Collapse,
    Paper,
    Typography
} from "@material-ui/core";
import { connect } from "react-redux";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    actionToolbar: {
        background: theme.palette.primary.light
    }
});

class AddEventExpansionPanel extends React.Component {
    state = {
        expanded: false
    };

    handleCollapse = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, dispatch } = this.props;
        const { expanded } = this.state;
        return (
            <React.Fragment>
                <Toolbar className={classes.actionToolbar}>
                    <Button
                        className={classes.button}
                        onClick={this.handleCollapse}
                    >
                        Add Task
                    </Button>
                    <Button className={classes.button}>Quick To-Do List</Button>
                </Toolbar>
                <Collapse in={expanded}>
                    <Paper>
                        <Typography variant="h4" component="h3">
                            Add a new event
                        </Typography>
                        <AddEventForm
                            onSubmit={event => {
                                dispatch(addEvent(event));
                                this.setState({ expanded: false });
                            }}
                        />
                    </Paper>
                </Collapse>
            </React.Fragment>
        );
    }
}

AddEventExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        events: state.events
    };
};

export default connect(mapStateToProps)(
    withStyles(styles)(AddEventExpansionPanel)
);

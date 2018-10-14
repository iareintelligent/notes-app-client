import React from "react";
import LoadingButton from "../components/LoadingButton";
import config from "../config";
import Slide from "@material-ui/core/Slide";
import PaperTextField from "../components/PaperTextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({});

class CreateNote extends React.Component {
    constructor(props) {
        super(props);

        this.file = null;
        this.state = {
            isLoading: null,
            content: ""
        };
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleFileChange = event => {
        this.file = event.target.files[0];
    };

    handleSubmit = async event => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                    1000000} MB.`
            );
            return;
        }

        this.setState({ isLoading: true });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <PaperTextField
                        id="content"
                        order={0}
                        value={this.state.value}
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="Create your note"
                        required={false}
                        type="textarea"
                        rows="8"
                    />
                </form>
                <Slide
                    direction="right"
                    in
                    mountOnEnter
                    unmountOnExit
                    style={{ transitionDelay: 100 }}
                >
                    <LoadingButton
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create note"
                        loadingText="Creating note..."
                        fullWidth
                    />
                </Slide>
            </div>
        );
    }
}

CreateNote.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateNote);

import React from "react";
import LoadingButton from "../components/LoadingButton";
import config from "../config";
import Slide from "@material-ui/core/Slide";
import PaperTextField from "../components/PaperTextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        marginTop: 0
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    hidden: {
        height: 0,
        width: 0
    }
});

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
        console.log("file", event.target.files[0]);
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

        try {
            const attachment = this.file ? await s3Upload(this.file) : null;
            await this.createNote({ attachment, content: this.state.content });
            this.props.history.push("/");
        } catch (code) {
            console.log(code);
            this.setState({ isLoading: false });
        }
    };

    createNote(note) {
        return API.post("notes", "/notes", {
            body: note
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <PaperTextField
                        id="content"
                        order={0}
                        variant="outlined"
                        handleChange={this.handleChange}
                        label="Create your note"
                        required={false}
                        type="textarea"
                        rows="8"
                        value={this.state.content}
                        fullWidth={true}
                    />
                    {!this.props.isAuthenticated && (
                        <React.Fragment>
                            <input
                                ref={"file-upload"}
                                type="file"
                                className={classes.hidden}
                                onChange={this.handleFileChange}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={event => {
                                    this.refs["file-upload"].click();
                                }}
                            >
                                Attachments
                                <CloudUploadIcon
                                    className={classes.rightIcon}
                                />
                            </Button>
                        </React.Fragment>
                    )}
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
                </form>
            </div>
        );
    }
}

CreateNote.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateNote);

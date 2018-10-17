import React from "react";
import { API, Storage } from "aws-amplify";
import BorderedEndlessScrollField from "../components/BorderedEndlessScrollField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import config from "../config";

export default class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            note: null,
            content: "",
            attachmentUrl: null
        };
    }

    async componentDidMount() {
        try {
            let attachmentUrl;
            const note = await this.getNote();
            const { content, attachment } = note;
            if (attachment) {
                attachmentUrl = await Storage.vault.get(attachment);
            }

            this.setState({
                note,
                content,
                attachmentUrl
            });
        } catch (error) {
            alert(error);
        }
    }

    getNote() {
        return API.get("notes", `/notes/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    formatFilename(str) {
        return str.replace(/^\w+-/, "");
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

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });
    };

    render() {
        const note = (
            <Paper
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Typography variant="h1" component="h1">
                    Note
                </Typography>
            </Paper>
        );
        return <BorderedEndlessScrollField content={note} />;
    }
}

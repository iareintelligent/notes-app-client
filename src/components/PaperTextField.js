import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class PaperTextField extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.renderTextInput = this.renderTextInput.bind(this);
        this.renderTextArea = this.renderTextArea.bind(this);
        this.renderPasswordField = this.renderPasswordField.bind(this);

        this.state = {
            showPassword: false
        };
    }
    handleClickShowPassword = () => {
        this.setState(state => ({
            showPassword: !state.showPassword
        }));
    };

    handleChange = event => {
        this.props.handleChange(event);
    };

    renderTextInput() {
        const {
            variant = "standard",
            value = "",
            id = "",
            label = ""
        } = this.props;
        return (
            <TextField
                id={id}
                label={label}
                variant={variant}
                value={value}
                onChange={this.handleChange}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
            />
        );
    }
    renderPasswordField() {
        const {
            variant = "standard",
            value = "",
            id = "",
            label = ""
        } = this.props;
        return (
            <FormControl fullWidth>
                <InputLabel htmlFor="password">{label}</InputLabel>
                <Input
                    autoComplete="new-password"
                    required
                    id={id}
                    variant={variant}
                    value={value}
                    onChange={this.handleChange}
                    type={this.state.showPassword ? "text" : "password"}
                    error={value.length < 6 ? true : false}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                            >
                                {this.state.showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    }
    renderTextArea() {
        const {
            variant = "standard",
            value = "",
            required = "false",
            id = "",
            label = "",
            rows
        } = this.props;
        return (
            <TextField
                required={required}
                id={id}
                label={label}
                variant={variant}
                value={value}
                onChange={this.handleChange}
                fullWidth={this.props.fullWidth}
                multiline
                rows={rows}
            />
        );
    }
    renderSwitch(inputType) {
        switch (inputType) {
            case "password":
                return this.renderPasswordField();
            case "textarea":
                return this.renderTextArea();
            default:
                return this.renderTextInput();
        }
    }

    render() {
        const {
            classes,
            order = 0,
            renderField = true,
            type = ""
        } = this.props;

        return (
            <Slide
                direction="right"
                in={renderField}
                mountOnEnter
                unmountOnExit
                style={{ transitionDelay: order ? order * 100 : 0 }}
            >
                <Paper elevation={4} className={classes.paper}>
                    {this.renderSwitch(type)}
                </Paper>
            </Slide>
        );
    }
}

PaperTextField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperTextField);

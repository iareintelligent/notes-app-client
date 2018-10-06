import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Auth } from "aws-amplify";
import SnackbarNotifier, { openSnackbar } from "../components/SnackbarNotifier";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";
import LoadingButton from "../components/LoadingButton";

const styles = theme => ({
    login: {
        padding: "20px 20px 60px"
    },
    textField: {
        marginBottom: ".5rem"
    },
    loginButton: {
        margin: ".5rem auto"
    },
    loginForm: {
        margin: "0 auto",
        maxWidth: "320px"
    },
    paper: {
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPassword: false,
            isLoading: false,
            buttonContent: "Log In",
            buttonDisabled: false
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.showNotifier({ message: "Signed in!", variant: "success" });
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (error) {
            this.showNotifier({ message: error.message, variant: "error" });
            this.props.userHasAuthenticated(false);
        }
        this.setState({ isLoading: false });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    showNotifier = ({ message, variant }) => {
        openSnackbar({ message, variant });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.login}>
                <form
                    onSubmit={this.handleSubmit}
                    className={classes.loginForm}
                >
                    <Zoom in style={{ transitionDelay: 500 }}>
                        <Paper elevation={4} className={classes.paper}>
                            <FormControl fullWidth>
                                <TextField
                                    id="email"
                                    label="email"
                                    type="email"
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </FormControl>
                        </Paper>
                    </Zoom>
                    <Zoom in style={{ transitionDelay: 500 }}>
                        <Paper elevation={4} className={classes.paper}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password">
                                    password
                                </InputLabel>
                                <Input
                                    id="password"
                                    label="password"
                                    type={
                                        this.state.showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    fullWidth
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={
                                                    this.handleClickShowPassword
                                                }
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
                        </Paper>
                    </Zoom>
                    <Zoom in style={{ transitionDelay: 500 }}>
                        <LoadingButton
                            isLoading={this.state.isLoading}
                            text="Log in"
                            loadingText="Logging in..."
                        />
                    </Zoom>
                    <SnackbarNotifier />
                </form>
            </div>
        );
    }
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);

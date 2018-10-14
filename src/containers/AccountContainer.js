import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import PaperTextField from "../components/PaperTextField";
import LoadingButton from "../components/LoadingButton";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    login: {
        padding: "20px 20px 60px"
    },
    loginForm: {
        margin: "0 auto",
        maxWidth: "320px"
    },
    button: {
        marginTop: theme.spacing.unit * 2
    }
});

class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            isLoading: false,
            buttonContent: "Log In",
            buttonDisabled: false,
            signingIn: true,
            signingUp: false,
            newUser: null
        };
    }

    validateSignupForm() {
        if (this.state.signingUp) {
            return (
                this.state.email.length > 0 &&
                this.state.password.length > 0 &&
                this.state.password === this.state.confirmPassword
            );
        } else {
            console.log("signing in");
            return (
                this.state.email.length > 0 && this.state.password.length > 0
            );
        }
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        console.log(event.target.value);
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });
        if (this.state.signingIn) {
            try {
                await Auth.signIn(this.state.email, this.state.password);
                this.props.userHasAuthenticated(true);
                this.props.history.push("/");
            } catch (error) {
                this.props.userHasAuthenticated(false);
            }
        } else if (this.state.signingUp) {
            try {
                const newUser = await Auth.signUp({
                    username: this.state.email,
                    password: this.state.password
                });
                this.setState({ newUser });
            } catch (e) {
                alert(e.message);
            }
        }

        this.setState({ isLoading: false });
    };

    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        try {
            await Auth.confirmSignUp(
                this.state.email,
                this.state.confirmationCode
            );
            await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    };

    handleSignup = () => {
        this.setState({
            signingIn: !this.state.signingIn,
            signingUp: !this.state.signingUp
        });
    };

    renderForm() {
        const { classes } = this.props;
        return (
            <div className={classes.login}>
                <form
                    onSubmit={this.handleSubmit}
                    className={classes.loginForm}
                >
                    <PaperTextField
                        variant="standard"
                        id="email"
                        label="email"
                        type="email"
                        required={true}
                        handleChange={this.handleChange}
                        renderField={true}
                        value={this.state.value}
                    />
                    <PaperTextField
                        variant="standard"
                        id="password"
                        label="password"
                        type="password"
                        required={true}
                        order={1}
                        handleChange={this.handleChange}
                        renderField={true}
                    />
                    <PaperTextField
                        error={this.state.validSignupForm}
                        variant="standard"
                        id="confirmPassword"
                        label="confirm password"
                        type="password"
                        required={true}
                        order={2}
                        handleChange={this.handleChange}
                        renderField={this.state.signingUp}
                    />
                    <Slide
                        direction="right"
                        in
                        mountOnEnter
                        unmountOnExit
                        style={{ transitionDelay: 300 }}
                    >
                        <LoadingButton
                            isLoading={this.state.isLoading}
                            text={
                                this.state.signingIn
                                    ? "Log in"
                                    : "Create account"
                            }
                            loadingText={
                                this.state.signginIn
                                    ? "Logging in..."
                                    : "Creating account..."
                            }
                            disabled={!this.validateSignupForm()}
                        />
                    </Slide>
                    <Slide
                        direction="right"
                        in
                        mountOnEnter
                        unmountOnExit
                        style={{ transitionDelay: 400 }}
                    >
                        <Button
                            className={classes.button}
                            color="primary"
                            fullWidth
                            onClick={this.handleSignup}
                        >
                            {this.state.signingIn
                                ? "Create an account"
                                : "Cancel"}
                        </Button>
                    </Slide>
                </form>
            </div>
        );
    }

    renderConfirmationForm() {
        return (
            <form onSubmit={this.handleConfirmationSubmit}>
                <PaperTextField
                    variant="standard"
                    id="confirmation-code"
                    label="Confirmation code"
                    type="text"
                    required={true}
                    order={0}
                    handleChange={this.handleChange}
                    renderField={true}
                />
                <Slide
                    direction="right"
                    in
                    mountOnEnter
                    unmountOnExit
                    style={{ transitionDelay: 100 }}
                >
                    <LoadingButton
                        isLoading={this.state.isLoading}
                        text="Verify"
                        loadingText="Verifying..."
                    />
                </Slide>
            </form>
        );
    }

    render() {
        return (
            <div className="Confirm">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);

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

class AccountContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            isLoading: false,
            buttonContent: "Log In",
            buttonLoadingContent: "Logging In...",
            buttonDisabled: false,
            buttonColor: "default",
            signingIn: true,
            signingUp: false,
            newUser: null
        };
    }
    transformErrorButton(content) {
        this.setState({
            buttonColor: "secondary",
            buttonContent: content,
            buttonDisabled: true
        });
    }
    resetButtonState() {
        !this.state.signingIn
            ? this.setState({
                  buttonContent: "Log in",
                  buttonLoadingContent: "Logging in..."
              })
            : this.setState({
                  buttonContent: "Create account",
                  buttonLoadingContent: "Creating account..."
              });
    }

    validateSignupForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 5 &&
            ((this.state.signingUp &&
                this.state.password === this.state.confirmPassword) ||
                this.state.signingIn)
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
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
                console.log(error);
                this.transformErrorButton(error.message);
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
            signingUp: !this.state.signingUp,
            buttonColor: "default"
        });
        this.resetButtonState();
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
                        id="email"
                        label="email"
                        type="email"
                        handleChange={this.handleChange}
                        value={this.state.email}
                        autoComplete="new-password"
                        fullWidth
                    />
                    <PaperTextField
                        id="password"
                        label="password"
                        type="password"
                        order={1}
                        handleChange={this.handleChange}
                        value={this.state.password}
                        autoComplete="new-password"
                    />
                    <PaperTextField
                        error={this.state.validSignupForm}
                        id="confirmPassword"
                        label="confirm password"
                        type="password"
                        order={2}
                        handleChange={this.handleChange}
                        renderField={this.state.signingUp}
                        value={this.state.confirmPassword}
                        autoComplete="new-password"
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
                            text={this.state.buttonContent}
                            loadingText={this.state.buttonLoadingContent}
                            color={this.state.buttonColor}
                            disabled={
                                this.state.buttonDisabled &&
                                !this.validateSignupForm()
                            }
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
                    id="confirmationCode"
                    label="Confirmation code"
                    type="text"
                    order={0}
                    handleChange={this.handleChange}
                    renderField={true}
                    value={this.state.confirmationCode}
                    fullWidth
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
                        disabled={!this.validateConfirmationForm()}
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

AccountContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountContainer);

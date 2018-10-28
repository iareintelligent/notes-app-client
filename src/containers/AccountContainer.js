import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import PaperTextField from "../components/PaperTextField";
import LoadingButton from "../components/LoadingButton";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
    login: {
        padding: "20px 20px 60px"
    },
    loginForm: {
        margin: "0 auto",
        maxWidth: "320px",
        textAlign: "center"
    },
    button: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
});

class AccountContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formAction: "forgotPassword",
            email: "topher@bythecode.agency",
            password: "",
            passwordLabel: "password",
            matchingPassword: "",
            confirmationCode: "",
            disableEmailInput: true,
            disableActionButton: false,
            showPasswordInput: true,
            showMatchingPasswordInput: false,
            showConfirmationInput: false,
            buttonContent: "Log In",
            buttonLoadingContent: "Logging In...",
            successInfo: "",
            isLoading: false
        };
    }
    emailInput = () => (
        <React.Fragment>
            <PaperTextField
                id="email"
                label="email"
                type="email"
                handleChange={this.handleChange}
                value={this.state.email}
                autoComplete="new-password"
                disabled={this.state.disableEmailInput}
                fullWidth
            />
        </React.Fragment>
    );
    passwordInput = (order = 0) => (
        <React.Fragment>
            <PaperTextField
                id="password"
                label={this.state.passwordLabel}
                type="password"
                order={order}
                renderField={this.state.showPasswordInput}
                handleChange={this.handleChange}
                value={this.state.password}
                autoComplete="new-password"
            />
        </React.Fragment>
    );
    matchingPasswordInput = (order = 0) => (
        <React.Fragment>
            <PaperTextField
                error={this.state.validSignupForm}
                id="confirmPassword"
                label="confirm password"
                type="password"
                order={order}
                handleChange={this.handleChange}
                renderField={this.state.showMatchingPasswordInput}
                value={this.state.confirmPassword}
                autoComplete="new-password"
            />
        </React.Fragment>
    );
    confirmationCodeInput = (order = 0) => (
        <React.Fragment>
            <PaperTextField
                id="confirmationCode"
                label="confirmation code"
                type="text"
                order={order}
                handleChange={this.handleChange}
                renderField={this.state.showConfirmationInput}
                value={this.state.confirmationCode}
                fullWidth
            />
            {this.renderFormActionButton({
                order: 0,
                buttonContent: "Resend confirmation code",
                buttonLoadingContent: "Resending confirmation code...",
                disabled: this.state.disableActionButton,
                type: "button",
                renderField:
                    this.state.showConfirmationInput &&
                    this.state.confirmationCode.length === 0,
                onClick: this.handleResendConfirmation
            })}
        </React.Fragment>
    );

    renderFormActionButton = ({
        order = 0,
        color = "primary",
        disabled = false,
        buttonContent = this.state.buttonContent,
        buttonLoadingContent = this.state.buttonLoadingContent,
        renderField = true,
        ...props
    }) => {
        const delay = parseInt(order) * 100;
        return (
            <Slide
                direction="right"
                mountOnEnter
                unmountOnExit
                in={renderField}
                style={{ transitionDelay: order * 100 }}
            >
                <LoadingButton
                    isLoading={this.state.isLoading}
                    text={buttonContent}
                    loadingText={buttonLoadingContent}
                    color={color}
                    disabled={disabled}
                    {...props}
                />
            </Slide>
        );
    };

    setSignInState() {
        this.setState({
            isLoading: false,
            formAction: "signIn",
            disableEmailInput: false,
            disableActionButton: false,
            showPasswordInput: true,
            showMatchingPasswordInput: false,
            showConfirmationInput: false,
            buttonContent: "Log in",
            buttonLoadingContent: "Logging in...",
            passwordLabel: "password"
        });
    }
    setSignUpState() {
        this.setState({
            formAction: "signUp",
            isLoading: false,
            disableEmailInput: false,
            disableActionButton: false,
            showPasswordInput: true,
            showMatchingPasswordInput: true,
            showConfirmationInput: false,
            passwordLabel: "password",
            buttonContent: "Sign up",
            buttonLoadingContent: "Signing up..."
        });
    }
    setConfirmSignUpState() {
        this.setState({
            isLoading: false,
            formAction: "confirmSignUp",
            disableEmailInput: true,
            disableActionButton: false,
            showPasswordInput: false,
            showMatchingPasswordInput: false,
            showConfirmationInput: true
        });
    }
    setSignInPasswordErrorState(error = "") {
        this.setState({
            isLoading: false,
            formAction: "signInPasswordError",
            disableEmailInput: false,
            showPasswordInput: true,
            showMatchingPasswordInput: false,
            showConfirmationInput: false,
            disableActionButton: true,
            buttonContent: error,
            buttonLoadingContent: "Sending confirmation code..."
        });
    }
    setForgotPasswordState() {
        this.setState({
            formAction: "forgotPassword",
            isLoading: false,
            disableEmailInput: true,
            disableActionButton: false,
            showPasswordInput: true,
            showMatchingPasswordInput: false,
            showConfirmationInput: true,
            buttonContent: "Change your password",
            buttonLoadingText: "Bothering our engineers...",
            passwordLabel: "new password"
        });
    }

    handleResendConfirmation = async event => {
        this.setState({ isLoading: true });
        switch (this.state.formAction) {
            case "confirmSignup":
                this.handleConfirmSignUp();
                break;
            case "forgotPassword":
                this.forgotPassword();
                break;
            default:
                break;
        }
    };

    handleSignIn = async event => {
        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (error) {
            console.log(error);
            if (error.code === "NotAuthorizedException") {
                this.setSignInPasswordErrorState(error.message);
                this.props.userHasAuthenticated(false);
            }
        }
    };

    handleResetPassword = async event => {
        try {
            await Auth.forgotPassword(this.state.email);
            this.setState({ password: "" });
            this.setForgotPasswordState();
        } catch (e) {
            this.setState({ buttonContent: e.message });
        }
    };

    handleSubmitNewPassword = async event => {
        try {
            Auth.forgotPasswordSubmit(
                this.state.email,
                this.state.confirmationCode,
                this.state.password
            );
        } catch (e) {
            this.setState({ buttonContent: e.message });
        }
        this.setSignInState();
        this.props.history.push("/signin");
    };

    handleSignUp = async event => {
        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
            });
            this.setState({ newUser });
            this.setConfirmSignUpState();
        } catch (e) {
            this.setState({ buttonContent: e.message });
        }
    };
    handleConfirmSignUp = async event => {
        try {
            await Auth.confirmSignUp(
                this.state.email,
                this.state.confirmationCode
            );
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            this.setState({ buttonContent: e.message });
        }
    };

    handleFormSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        switch (this.state.formAction) {
            case "signIn":
                this.handleSignIn(event);
                break;
            case "signInPasswordError":
                //only clickable button = "reset password"
                this.handleResetPassword(event);
                break;
            case "forgotPassword":
                //action button = "reset password"; requires: confirmation code and password.
                this.handleSubmitNewPassword(event);
                break;
            case "signUp":
                this.handleSignUp();
                break;
            case "confirmSignup":
                this.handleConfirmSignUp();
                break;
            default:
        }
    };

    componentWillMount() {
        this.setSignInState();
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

    forgotPassword = async event => {
        this.setState({ isLoading: true });
        try {
            await Auth.forgotPassword(this.state.email);
        } catch (e) {
            this.everythingsEffed(this.state.formAction, e.message);
        }
        this.setState({ isLoading: false });
    };

    handleResendVerification = async event => {
        try {
            await Auth.resendSignUp(this.state.email);
            this.setState({
                isLoading: true
            });
        } catch (error) {
            alert(error.message);
        }
        this.setState({
            isLoading: false
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.login}>
                <form
                    className={classes.loginForm}
                    onSubmit={this.handleFormSubmit}
                >
                    {this.emailInput()}
                    {this.confirmationCodeInput()}
                    {this.passwordInput()}
                    {this.matchingPasswordInput()}
                    {this.state.formAction === "signInPasswordError" &&
                        this.renderFormActionButton({
                            order: 0,
                            buttonContent: "Reset Password",
                            buttonLoadingContent: "Bothering our engineers...",
                            color: "secondary",
                            disabled: false,
                            type: "submit"
                        })}
                    {this.renderFormActionButton({
                        color: !this.state.disableActionButton
                            ? "default"
                            : "secondary",
                        disabled: this.state.disableActionButton,
                        variant: "contained"
                    })}
                </form>
            </div>
        );
    }
}

AccountContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountContainer);

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Auth } from "aws-amplify";


const styles = theme => ({
    login: {
        padding: "20px 20px 60px",
        border: "1px solid",
        borderRadius: "10px"
    },
    textField: {
        marginBottom: ".5rem"
    },
    loginButton: {
        margin: "1rem auto"
    },
    loginForm: {
        margin: "0 auto",
        maxWidth: "320px"
    }
});
class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showPassword: false
        };
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await Auth.signIn(this.state.email, this.state.password);
        } catch {}
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.login}>
                <Typography variant="button" component="h2">
                    Log on in, note takers!
                </Typography>
                <form
                    onSubmit={this.handleSubmit}
                    className={classes.loginForm}
                >
                    <TextField
                        id="email"
                        label="email"
                        type="email"
                        variant="outlined"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            label="password"
                            type={this.state.showPassword ? "text" : "password"}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
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
                    <Button
                        type="submit"
                        variant="raised"
                        className={classes.loginButton}
                        fullWidth
                    >
                        Log in
                    </Button>
                </form>
            </div>
        );
    }
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);

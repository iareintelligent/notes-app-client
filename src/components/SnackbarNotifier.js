import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

let openSnackbarFn;

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
});

function MySnackbarContent(props) {
    const { classes, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classes[variant]}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon
                        className={classNames(
                            classes.icon,
                            classes.iconVariant
                        )}
                    />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

export default class SnackbarNotifier extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            open: false,
            message: "",
            variant: "info"
        };
    }

    componentDidMount() {
        openSnackbarFn = this.openSnackbar;
    }

    openSnackbar = ({ message, variant }) => {
        this.setState({
            open: true,
            message,
            variant
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
            message: ""
        });
    };

    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={this.handleClose}
                    message={this.state.message}
                    variant={this.state.variant}
                />
            </Snackbar>
        );
    }
}

export function openSnackbar({ message, variant }) {
    openSnackbarFn({ message, variant });
}
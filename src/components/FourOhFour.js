import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = {
    four04: {
        paddingTop: "100px",
        textAlign: "center"
    }
};

class FourOhFour extends React.PureComponent {
    render() {
        return (
            <div className={this.props.classes.four04}>
                <Typography variant="headline" component="h3">
                    Sorry, page not found!
                </Typography>
            </div>
        );
    }
}

FourOhFour.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FourOhFour);

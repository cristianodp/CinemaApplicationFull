import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { generic } from "./strings";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function ProgressView(props) {
  const { classes } = props;
  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <CircularProgress className={classes.progress} size={50} />
      <h2>{generic.msgWaiting}</h2>
    </div>
  );
}

ProgressView.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ProgressView);

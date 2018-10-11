import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import RowMovie from "./rowMovie";

const styles = theme => ({
  typography: {
    useNextVariants: true,
  },
  list: {}
});

class ListMovies extends Component {
  render() {
    const { classes, list, onSelected } = this.props;

    if (list.length === 0) {
      return (
        <div style={{ textAlign: "center", marginTop: "30%" }}>
          <CloseIcon fontSize="large" />
          <Typography className={classes.typography} variant="subtitle1"> No data found</Typography>
        </div>
      );
    }

    return list.map(it => (
      <RowMovie key={it.filmId} film={it} onSelected={onSelected} />
    ));
  }
}

ListMovies.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ListMovies);

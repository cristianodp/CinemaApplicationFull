import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../common/template/header";

const styles = theme => ({
  conatiner: {
    margin: theme.spacing.unit
  }
});

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: true
    };
  }

  render() {
    return (
      <Fragment>
        <Header title="About" />
      </Fragment>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);

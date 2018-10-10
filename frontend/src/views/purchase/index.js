import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import ProgressView from "../../common/template/processView";
import Room from "./room";

const { URL_DOMAIN } = require("../../env");

const styles = theme => ({
  conatiner: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: "16px",
    minWidth: "120px"
  }
});

class Purchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: true
    };
    this._getRoom = this._getRoom.bind(this);
  }

  componentDidMount() {
    const { session } = this.props;
    this._getRoom(session);
  }

  _getRoom = session => {
    const url = `${URL_DOMAIN}/sessionOcupation?session_id=${session.id}`;
    const _this = this;

    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          _this.setState({
            list: [],
            loading: false
          });
          return;
        }

        response.json().then(function(data) {
          _this.setState({
            list: data,
            loading: false
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { session, onFinish } = this.props;
    const { loading, list } = this.state;

    console.log("list", list);
    return (
      <Fragment>
        {loading ? (
          <ProgressView label={"Aguarde..."} />
        ) : (
          <Room session={session} chairs={list} onFinish={onFinish} />
        )}
      </Fragment>
    );
  }
}

Purchase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Purchase);

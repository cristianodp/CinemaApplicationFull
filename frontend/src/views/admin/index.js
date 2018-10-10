import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import AddIcon from "@material-ui/icons/Add";

import ProgressView from "../../common/template/processView";
import Header from "../../common/template/header";
import CreateCinemaDialog from "./UploadFilmsDialog";

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

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,

      openSelect: false,
      openDialog: false,
      openSnackbar: false,
      erroMessage: ""
    };

    this._handlerShowSnackbar = this._handlerShowSnackbar.bind(this);
  }

  _handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _handlerShowSnackbar = message => {
    this.setState({
      openSnackbar: true,
      erroMessage: message
    });
  };

  _handleSnackbarClose = () => {
    this.setState({ openSnackbar: false });
  };

  _handleOpen = () => {
    this.setState({ openSelect: true });
  };

  _handlerClickAdd = () => {
    this._handlerShowDialog(true);
  };

  _handlerShowDialog = show => {
    this.setState({ openDialog: show });
  };

  componentDidMount() {}

  render() {
    const { loading, openSnackbar, erroMessage } = this.state;

    console.log(openSnackbar, erroMessage);
    if (loading) {
      return <ProgressView label={"Aguarde..."} />;
    }

    return (
      <Fragment>
        <Header title="Admin" handlerSearch={this._handlerSearch} />

        <div
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px"
          }}
        >
          <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            onClick={this._handlerClickAdd}
          >
            <AddIcon />
          </Button>
        </div>

        <CreateCinemaDialog
          open={this.state.openDialog}
          handlerShowDialog={this._handlerShowDialog}
          handlerShowSnackbar={this._handlerShowSnackbar}
        />

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={openSnackbar}
          onClose={this._handleSnackbarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{erroMessage}</span>}
        />
      </Fragment>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Admin);

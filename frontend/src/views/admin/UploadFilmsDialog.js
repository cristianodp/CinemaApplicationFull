import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

import AlertDialog from "../../common/template/AlertDialog";

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

class CreateCinemaDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      messageErro: null
    };

    this._handleOkClick = this._handleOkClick.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleCancClick = this._handleCancClick.bind(this);
    this._uploadFilms = this._uploadFilms.bind(this);
    this._setError = this._setError.bind(this);
  }

  _handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  _handleFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  _setError(message) {
    this.setState({ messageErro: message });
  }

  _uploadFilms = (obj, callback) => {
    const data = new FormData();
    data.append("file", obj.file);

    fetch(`${URL_DOMAIN}/loadFilmsByFile`, {
      method: "POST",
      body: data
    })
      .then(response => {
        if (response.status === 200) {
          response.json().then(function(data) {
            callback(null, data);
          });
        } else {
          callback("Invalid file", null);
        }
      })
      .catch(err => {
        callback(err, null);
      });
  };

  _handleOkClick = () => {
    const { file, description } = this.state;
    const { handlerShowDialog } = this.props;

    if (!file) {
      console.log("Select the file");
      this._setError("Select the file");
      return;
    }

    const _this = this;
    this._uploadFilms({ description, file }, (err2, result2) => {
      if (err2) {
        console.log(err2);
        _this._setError(err2);
        return;
      }
      handlerShowDialog(false);
    });
  };

  _handleCancClick = event => {
    this.props.handlerShowDialog(false);
  };

  render() {
    const { classes, open } = this.props;
    const { description, messageErro } = this.state;

    return (
      <Fragment>
        <Dialog open={open}>
          <div style={{ padding: "32px" }}>
            <form className={classes.container} noValidate autoComplete="off">
              <Typography
                id="descriptionTextField"
                label=""
                name="description"
                className={classes.textField}
                value={description}
                onChange={this._handleChange("description")}
                margin="normal"
              >
                Select the csv file{" "}
              </Typography>

              <br />
              <div
                style={{
                  textAlign: "center",
                  margin: "32px"
                }}
              >
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={this._handleFileChange}
                />
              </div>
              <div
                style={{
                  marginTop: "16px"
                }}
              >
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={this._handleCancClick}
                  color="default"
                >
                  Cancelar
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={this._handleOkClick}
                  style={{ float: "right" }}
                >
                  Ok
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
        <AlertDialog
          title={"Attention"}
          message={messageErro}
          open={messageErro !== null}
          handleClose={() => {
            this._setError(null);
          }}
        />
      </Fragment>
    );
  }
}

CreateCinemaDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateCinemaDialog);

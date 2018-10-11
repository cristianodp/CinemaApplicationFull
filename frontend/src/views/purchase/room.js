import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import PaymentDialog from "./paymentDialog";
import { roomPage } from "../../common/template/strings";

const styles = theme => ({
  conatiner: {
    margin: theme.spacing.unit
  },
  screen: {
    backgroundColor: "#000000b0",
    color: "white",
    margin: "24px",
    textAlign: "center"
  },
  sessonInfo: {
    padding: "16px",
    color: "white",
    margin: "16px",
    textAlign: "center"
  },
  totalPanel: {
    padding: "8px",
    paddingBottom: "8px",
    paddingLeft: "32px",
    paddingRight: "32px",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#485cbd",
    color: "white"
  }
});

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chairsSelected: [],
      openSnackbar: false,
      erroMessage: "",
      openDialog: false
    };

    this._selectChair = this._selectChair.bind(this);
    this._getTotal = this._getTotal.bind(this);
    this._handlerBuy = this._handlerBuy.bind(this);
    this._handlerShowSnackbar = this._handlerShowSnackbar.bind(this);
    this._handlerShowDialog = this._handlerShowDialog.bind(this);
    this._handleSnackbarClose = this._handleSnackbarClose.bind(this);
    this._handlerCanc = this._handlerCanc.bind(this);
    this._getTotalFormated = this._getTotalFormated.bind(this);
  }

  _handlerShowDialog = show => {
    this.setState({ openDialog: show });
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

  _selectChair(addAction, chair) {
    let { chairsSelected } = this.state;

    if (addAction) {
      if (chairsSelected.filter(it => it === chair).length === 0) {
        chairsSelected.push(chair);
      }
    } else {
      chairsSelected = chairsSelected.filter(it => it !== chair);
    }

    this.setState({ chairsSelected: chairsSelected });
  }

  _getTotal() {
    const { session } = this.props;
    const { chairsSelected } = this.state;

    return chairsSelected.length * session.price;
  }

  _getTotalFormated() {
    return Number.parseFloat(this._getTotal()).toFixed(2);
  }

  _handlerBuy() {
    const { chairsSelected } = this.state;

    if (chairsSelected.length === 0) {
      this._handlerShowSnackbar(roomPage.msgSelectOneChair);
      return;
    }
    this._handlerShowDialog(true);
  }
  _handlerCanc() {
    this.props.onFinish();
  }

  render() {
    const { classes, chairs, session, onFinish } = this.props;
    const { chairsSelected } = this.state;

    return (
      <Fragment>
        <div className={classes.sessonInfo}>
          <Typography variant="h6">
            {roomPage.msgSelectChair
              .replace("<name>", session.name)
              .replace("<time>", session.time)}
          </Typography>
        </div>
        <div className={classes.screen}>
          <Typography variant="subtitle1" style={{ color: "white" }}>
            {roomPage.LbScreen}
          </Typography>
        </div>
        {chairs.map((row, index) => (
          <div key={index} style={{ textAlign: "Center" }}>
            {row.map(col => (
              <div key={col.chair} style={{ display: "inline-block" }}>
                <div>
                  <Checkbox
                    disabled={!col.isAvilable}
                    indeterminate={!col.isAvilable}
                    key={col.chair}
                    onClick={e => {
                      this._selectChair(e.target.checked, col.chair);
                    }}
                  />
                </div>
                <div>{col.chair}</div>
              </div>
            ))}
          </div>
        ))}

        <div className={classes.totalPanel} color="default">
          <Typography variant="h6" style={{ float: "left", color: "white" }}>
            {`${roomPage.LbTotal} ${this._getTotalFormated()}`}
          </Typography>

          <Button
            style={{ float: "right", marginLeft: "8px" }}
            color="secondary"
            variant="contained"
            onClick={this._handlerBuy}
          >
            {" "}
            {roomPage.btnBuy}
          </Button>

          <Button
            style={{ float: "right" }}
            color="default"
            variant="contained"
            onClick={this._handlerCanc}
          >
            {" "}
            {roomPage.btnCanc}
          </Button>
        </div>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.openSnackbar}
          onClose={this._handleSnackbarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.erroMessage}</span>}
        />

        <PaymentDialog
          session={session}
          chairsSelected={chairsSelected}
          onFinish={onFinish}
          total={this._getTotal()}
          open={this.state.openDialog}
          handlerShowDialog={this._handlerShowDialog}
          handlerShowSnackbar={this._handlerShowSnackbar}
        />
      </Fragment>
    );
  }
}

Room.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Room);

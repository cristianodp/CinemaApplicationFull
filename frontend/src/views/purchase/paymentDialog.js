import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { dgPorchse } from "../../common/template/strings";
import Grid from "@material-ui/core/Grid";
import { isEmpty } from "../../common/utils";
import AlertDialog from "../../common/template/AlertDialog";
import TextFieldMask, {
  CreditCardNumberMask,
  CreditCardSecureCodeMask,
  CreditCardExpDateMask
} from "../../common/template/textFieldMask";

const { URL_DOMAIN } = require("../../env");

const styles = theme => ({
  conatiner: {
    margin: theme.spacing.unit
  },
  textField: {
    width: "100%"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: "16px",
    minWidth: "120px"
  }
});

class PaymentDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      cardNumber: "",
      expireDate: "",
      code: "",
      messageErro: null
    };

    this._handleOkClick = this._handleOkClick.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleCancClick = this._handleCancClick.bind(this);
    this._setError = this._setError.bind(this);
  }

  handleClickOpen = () => {
    this.props.handlerShowDialog(true);
  };

  _handleClose = () => {
    this.props.handlerShowDialog(false);
  };

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
  _handleOkClick = () => {
    const { customerName, cardNumber, expireDate, code } = this.state;
    const { session, chairsSelected, total } = this.props;

    if (
      isEmpty(customerName) ||
      isEmpty(cardNumber) ||
      isEmpty(expireDate) ||
      isEmpty(code)
    ) {
      this.props.handlerShowSnackbar(dgPorchse.msgInformRequiredFields);
      return;
    }

    //this way is just because of Allow cross Origin  origen and the api is http
    const data = new FormData();
    data.append("customerName", customerName);
    data.append("cardNumber", cardNumber);
    data.append("expireDate", expireDate);
    data.append("code", code);
    data.append("sessionId", session.id);
    data.append("film_id", session.id);
    data.append("room", session.room);
    data.append("chairs", chairsSelected);
    data.append("total", total);

    const _this = this;
    fetch(`${URL_DOMAIN}/purchase/payment`, {
      method: "POST",
      body: data
    })
      .then(response => {
        if (response.status !== 200) {
          try {
            _this._setError(`${response.statusText} ${response.status} `);
          } catch (e) {}
          return;
        }

        response.json().then(data => {
          console.log(data);

          _this.props.handlerShowSnackbar(dgPorchse.MsgProcessed);
          _this.props.handlerShowDialog(false);
          _this.props.onFinish();

          window.open(
            `${URL_DOMAIN}/purchase/orderDetail?purchase_id=${data.purchase_id}`
          );
        });
      })
      .catch(err => {
        this._setError(err);
        return;
      });
  };

  _handleCancClick = event => {
    this.props.handlerShowDialog(false);
  };

  render() {
    const { classes, open } = this.props;
    const {
      customerName,
      cardNumber,
      expireDate,
      code,
      messageErro
    } = this.state;

    return (
      <Dialog open={open}>
        <DialogTitle id="scroll-dialog-title">
          {dgPorchse.LbTitle}
          <DialogContent>
            <div style={{ padding: "32px" }}>
              <form className={classes.container} noValidate autoComplete="off">
                <Grid item xs={12} sm container>
                  <Grid item xs={12}>
                    <TextField
                      id="nomeTextField"
                      label={dgPorchse.LbCustomerName}
                      name="customerName"
                      className={classes.textField}
                      value={customerName}
                      onChange={this._handleChange("customerName")}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldMask
                      id="cardNumberTextField"
                      label={dgPorchse.LbCredCard}
                      name="cardNumber"
                      className={classes.textField}
                      maskField={CreditCardNumberMask}
                      value={cardNumber.trim()}
                      onChange={this._handleChange("cardNumber")}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldMask
                      id="expireDateTextField"
                      label={dgPorchse.LbExpirationDate}
                      name="expireDate"
                      maskField={CreditCardExpDateMask}
                      className={classes.textField}
                      value={expireDate}
                      onChange={this._handleChange("expireDate")}
                      margin="normal"
                    />

                    <TextFieldMask
                      id="codeTextField"
                      label={dgPorchse.LbSecureCode}
                      name="code"
                      className={classes.textField}
                      maskField={CreditCardSecureCodeMask}
                      value={code}
                      onChange={this._handleChange("code")}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={this._handleClose}
            variant="contained"
            color="default"
          >
            {dgPorchse.BtnCanc}
          </Button>
          <Button
            onClick={this._handleOkClick}
            variant="contained"
            color="primary"
          >
            {dgPorchse.BtnFinish}
          </Button>
        </DialogActions>
        <AlertDialog
          title={"Attention"}
          message={messageErro}
          open={messageErro !== null}
          handleClose={() => {
            this._setError(null);
          }}
        />
      </Dialog>
    );
  }
}

PaymentDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaymentDialog);

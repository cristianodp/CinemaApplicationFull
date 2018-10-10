import React from "react";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const CreditCardNumberMask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,
    ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,
    ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/,
    ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

const CreditCardSecureCodeMask = [/[0-9]/, /[0-9]/, /[0-9]/];

const CreditCardExpDateMask = [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

const TextMask = mask => props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={mask}
      placeholderChar={"\u2000"}
    />
  );
};

TextMask.propTypes = {
  inputRef: PropTypes.func.isRequired
};

class TextFieldMask extends React.Component {
  state = { textMaskField: TextMask(CreditCardNumberMask) };
  componentDidMount() {
    const textMaskField = TextMask(
      this.props.maskField ? this.props.maskField : CreditCardNumberMask
    );
    this.setState({ textMaskField });
  }
  render() {
    return (
      <TextField
        {...this.props}
        InputProps={{
          inputComponent: this.state.textMaskField
        }}
      />
    );
  }
}

export {
  CreditCardNumberMask,
  CreditCardSecureCodeMask,
  CreditCardExpDateMask
};
export default TextFieldMask;

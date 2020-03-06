import React, { Component } from "react";
import "../css/register.css";

class FormInput extends Component {
  state = {
    text: ""
  };
  render() {
    const {
      type,
      id,
      className,
      placeholder,
      required,
      autoFocus
    } = this.props;
    return (
      <React.Fragment>
        <input
          type={type}
          id={id}
          className={className}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          onChange={this.handleChange.bind(this)}
        />
        {this.label()}
      </React.Fragment>
    );
  }

  label() {
    return;
    if (this.state.text.length === 0) {
      return (
        <label style={{ pointerEvents: "none" }} htmlFor={this.props.htmlFor}>
          {this.props.children}
        </label>
      );
    }
    return;
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) this.props.onChange(e);
  }
}

export default FormInput;

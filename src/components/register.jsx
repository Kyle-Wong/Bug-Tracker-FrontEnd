import React, { Component } from "react";
import "../stylesheet.css";
import FormInput from "./formInput";
import history from "../history";
const Global = require("../global");
class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    usernameError: "",
    emailError: "",
    passwordError: ""
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-lg-offset-3 mx-auto">
              <div className="card card-signin flex-row my-6">
                <div className="card-img-left d-none d-md-flex"></div>
                <div className="card-body">
                  <h1 className="card-title text-center">Register</h1>
                  <form
                    className="form-signin"
                    onSubmit={this.submit.bind(this)}
                  >
                    {this.state.usernameError.length > 0 && (
                      <div className="warning bg-danger">
                        {this.state.usernameError}
                      </div>
                    )}
                    <div className="form-label-group">
                      <FormInput
                        type="text"
                        id="inputUsername"
                        className="form-control"
                        placeholder="username"
                        required={true}
                        autoFocus={true}
                        htmlFor="inputUsername"
                        onChange={this.handleUsernameChange.bind(this)}
                      >
                        Username
                      </FormInput>
                    </div>
                    {this.state.emailError.length > 0 && (
                      <div className="warning bg-danger">
                        {this.state.emailError}
                      </div>
                    )}
                    <div className="form-label-group">
                      <FormInput
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required={true}
                        autoFocus={false}
                        htmlFor="inputEmail"
                        onChange={this.handleEmailChange.bind(this)}
                      >
                        Email Address
                      </FormInput>
                    </div>

                    <hr />
                    {this.state.passwordError.length > 0 && (
                      <div className="warning bg-danger">
                        {this.state.passwordError}
                      </div>
                    )}
                    <div className="form-label-group">
                      <FormInput
                        type="password"
                        id="FormInputPassword"
                        className="form-control"
                        placeholder="Password"
                        required={true}
                        autoFocus={false}
                        htmlFor="inputPassword"
                        onChange={this.handlePasswordChange.bind(this)}
                      >
                        Password
                      </FormInput>
                    </div>

                    <div className="form-label-group">
                      <FormInput
                        type="password"
                        id="FormInputConfirmPassword"
                        className="form-control"
                        placeholder="Password"
                        required={true}
                        autoFocus={false}
                        htmlFor="inputConfirmPassword"
                      >
                        Confirm password
                      </FormInput>
                    </div>

                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {}

  passwordError() {}
  emailError() {}
  submit(e) {
    e.preventDefault();
    this.registerRequest();
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  registerRequest() {
    const url = Global.gatewayUrl("idm/user/register");
    console.log(url);
    const { username, email, password } = this.state;
    const body = {
      username: username,
      email: email,
      password: password
    };
    let options = Global.options({}, body, "POST");
    console.log(options);
    Global.fetch(
      url,
      options,
      res => {
        this.success(res);
      },
      res => {
        this.error(res);
      }
    );
  }
  success(res) {
    alert("Success");
    console.log(res);
    window.location.href = Global.pageUrl("login");
  }
  error(res) {
    console.log(res);
    if (res.code === 418) {
      this.setState({
        usernameError: "Username must be less than 32 characters long."
      });
    } else if (res.code === 404) {
      this.setState({
        usernameError: "Username already exists."
      });
    } else if (res.code === 419) {
      this.setState({
        passwordError: "Password must be between 6 and 32 characters."
      });
    } else if (res.code === 420) {
      this.setState({
        emailError: "email must be less than 32 characters long."
      });
    }
  }
}

export default Register;

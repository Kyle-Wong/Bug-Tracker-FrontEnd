import React, { Component } from "react";
import "../../css/register.css";
import FormInput from "../register/formInput";
import Cookies from "universal-cookie";
import Global from "../../global";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    loginError: ""
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-lg-offset-4 mx-auto">
              <div className="card card-signin flex-row my-6">
                <div className="card-img-left d-none d-md-flex"></div>
                <div className="card-body">
                  <h1 className="card-title text-center">Login</h1>
                  <form
                    className="form-signin"
                    onSubmit={this.submit.bind(this)}
                  >
                    {this.state.loginError.length > 0 && (
                      <div className="warning bg-danger">
                        {this.state.loginError}
                      </div>
                    )}
                    <div className="form-label-group">
                      <FormInput
                        type="text"
                        id="inputUsername"
                        className="form-control"
                        placeholder="Username"
                        required={true}
                        autoFocus={true}
                        htmlFor="inputUsername"
                        onChange={this.handleUsernameChange.bind(this)}
                      >
                        Username
                      </FormInput>
                    </div>

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
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    Don't have an account?&nbsp;
                    <a href="register">Register here.</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  submit(e) {
    e.preventDefault();
    this.login();
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  login() {
    const url = Global.gatewayUrl("idm/user/login");
    console.log(url);
    const { username, password } = this.state;
    const body = {
      username: username,
      password: password
    };
    let options = Global.options({}, body, "POST");
    console.log(options);
    Global.fetch(
      url,
      options,
      res => {
        this.loginSuccess(res);
      },
      res => {
        this.loginError(res);
      }
    );
  }
  loginSuccess(res) {
    console.log(res);
    const { username, sessionID } = res.Session;
    const cookies = new Cookies();
    cookies.set("username", username);
    cookies.set("session", sessionID);
    window.location.href = Global.pageUrl("");
  }
  loginError(res) {
    console.log(res);
    if (res.code === 418 || res.code === 419 || res.code === 407) {
      this.setState({
        loginError: "Incorrect username or password."
      });
    } else if (res == "TypeError: Failed to fetch") {
      alert("Failed to reach Identity Management Server");
    }
  }
}

export default LoginPage;

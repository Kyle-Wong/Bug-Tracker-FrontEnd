import React, { Component } from "react";
const Global = require("../global");

class Register extends Component {
  state = {
    test: "NOTHING"
  };
  render() {
    return (
      <div>
        <h1>Register Page</h1>
        <div>{this.state.test}</div>
      </div>
    );
  }
  componentDidMount() {
    this.registerRequest();
  }
  registerRequest() {
    const url = Global.gatewayUrl("idm/user/login");
    console.log(url);
    const body = {
      username: "testUser12345",
      password: "password"
    };
    let options = Global.options({}, body, "POST");
    console.log(options);
    Global.fetch(url, options, res => {
      this.success(res);
    });
  }
  success(res) {
    console.log("Success");
    console.log(res);
    let state = this.state;
    state.test = res.Session.username;
    this.setState(state);
  }
}

export default Register;

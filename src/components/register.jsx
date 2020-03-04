import React, { Component } from "react";
import request from "../request";
import Fetch from "fetch";
const Global = require("../global");

class Register extends Component {
  state = {};
  render() {
    return <h1>Register Page</h1>;
  }
  componentDidMount() {
    this.registerRequest();
  }
  registerRequest() {
    const url = Global.gatewayUrl("idm/user/register");
    console.log(url);
    const body = {
      username: "testUser12345",
      email: "email@gmail.com",
      password: "password"
    };
    let headers = Global.corsHeader({}, "POST");
    const options = {
      headers: headers,
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors"
    };
    console.log(options);
    fetch(url, options)
      .then(data => {
        return data.json();
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  }
}

export default Register;

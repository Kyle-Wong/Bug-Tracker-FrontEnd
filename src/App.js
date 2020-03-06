import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import history from "./history";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css";

import MyNavbar from "./components/myNavbar";

import Home from "./components/home";
import Error from "./components/error";
import Register from "./components/register";
import RegisterSuccess from "./components/registerSuccess";
import Login from "./components/login";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MyNavbar />
        <BrowserRouter history={history}>
          <div>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/register" component={Register} />
              <Route path="/registerSuccess" component={RegisterSuccess} />
              <Route path="/login" component={Login} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;

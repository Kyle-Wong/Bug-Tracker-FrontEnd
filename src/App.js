import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import history from "./history";

import NavBar from "./components/navbar";

import Home from "./components/home";
import Error from "./components/error";
import Register from "./components/register";
import RegisterSuccess from "./components/registerSuccess";
import Login from "./components/login";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter history={history}>
        <NavBar />
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
    );
  }
}

export default App;

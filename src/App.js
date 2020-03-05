import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import history from "./history";

import Home from "./components/home";
import Error from "./components/error";
import Register from "./components/register";
import Login from "./components/login";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter history={history}>
        <div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

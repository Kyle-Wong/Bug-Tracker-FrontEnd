import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Register from "./components/register";
import Home from "./components/home";
import Error from "./components/error";
class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

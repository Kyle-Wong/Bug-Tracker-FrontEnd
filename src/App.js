import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css";

import MyNavbar from "./components/myNavbar";

import Home from "./components/homePage";
import Error from "./components/errorPage";
import Register from "./components/registerPage";
import RegisterSuccess from "./components/registerSuccessPage";
import Login from "./components/loginPage";
import Projects from "./components/projectsPage";
import ViewProject from "./components/ViewProjectPage";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MyNavbar />
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/register" component={Register} />
              <Route path="/registerSuccess" component={RegisterSuccess} />
              <Route path="/login" component={Login} />
              <Route exact path="/projects" component={Projects} />
              <Route path="/projects/:projectID" component={ViewProject} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;

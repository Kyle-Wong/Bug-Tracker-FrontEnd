import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Global from "./global";
import "./css/master.css";
import "./css/navbar.css";
import MyNavbar from "./components/myNavbar";

import Home from "./components/home/homePage";
import Error from "./components/errorPage";
import Register from "./components/register/registerPage";
import RegisterSuccess from "./components/register/registerSuccessPage";
import Login from "./components/login/loginPage";
import Projects from "./components/project/projectsPage";
import ViewProject from "./components/bug/ViewProjectPage";

class App extends Component {
  state = {
    userLoggedIn: false,
    visible: false
  };
  render() {
    return (
      <div>
        <MyNavbar
          userLoggedIn={this.state.userLoggedIn}
          handleLogOut={this.logOut.bind(this)}
        />
        <div className="back-wall">
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
        </div>
      </div>
    );
  }
  componentDidMount() {
    //check if logged in
    this.verifySession();
  }
  verifySession() {
    const url = Global.gatewayUrl("idm/verifySession");
    const body = Global.getSession();
    const options = Global.options({}, body, "POST");
    console.log(options);
    Global.fetch(
      url,
      options,
      data => {
        console.log(data);
        this.setState({ userLoggedIn: data.code === 0 });
      },
      data => {
        console.log(data);
        this.setState({ userLoggedIn: false });
      }
    );
  }

  logOut() {
    const url = Global.gatewayUrl("idm/user/logout");
    const body = {
      username: Global.getSession().username
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, data => {
      window.location.href = "";
    });
  }
}

export default App;

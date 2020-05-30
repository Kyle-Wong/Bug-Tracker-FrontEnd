import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Global from "./global";
import "./css/master.css";
import "./css/navbar.css";
import MyNavbar from "./components/myNavbar";

import Home from "./components/home/homePage";
import Error from "./components/errorPage";
import Register from "./components/register/registerPage";
import Login from "./components/login/loginPage";
import Projects from "./components/project/projectsPage";
import ViewProject from "./components/bug/ViewProjectPage";
import Invitation from "./components/invitation/invitationsPage";
import Permissions from "./components/permission/permissionsPage";
const history = require("history");

class App extends Component {
  state = {
    userLoggedIn: Global.getSession().username != null,
    visible: false,
  };

  render() {
    const browserHistory = history.createBrowserHistory();
    const unlisten = browserHistory.listen((location, action) => {
      alert(action, location.pathname, location.state);
    });
    return (
      <div>
        <div className="back-wall">
          <BrowserRouter history={browserHistory} forceRefresh={true}>
            <MyNavbar
              userLoggedIn={this.state.userLoggedIn}
              handleLogOut={this.logOut.bind(this)}
              history={browserHistory}
            />
            <div>
              <Switch>
                <Route
                  userLoggedIn={this.state.userLoggedIn}
                  path="/"
                  exact
                  render={(props) => {
                    return (
                      <Home {...props} userLoggedIn={this.state.userLoggedIn} />
                    );
                  }}
                />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route
                  path="/projects/:projectID/permissions"
                  component={Permissions}
                />
                <Route path="/projects/:projectID" component={ViewProject} />

                <Route exact path="/projects" component={Projects} />

                <Route path="/invitations" component={Invitation} />
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
    window.addEventListener("popstate", this.onBackButtonEvent);

    this.verifySession();
    console.log("VERIFY SESSION");
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.onBackButtonEvent);
  }
  onBackButtonEvent = () => {
    alert("HEY");
  };
  verifySession() {
    const url = Global.gatewayUrl("idm/verifySession");
    const body = Global.getSession();
    if (
      typeof body.username === "undefined" ||
      typeof body.session === "undefined"
    ) {
      this.setState({ userLoggedIn: false });
      return;
    }
    const options = Global.options({}, body, "POST");
    console.log(options);
    Global.fetch(
      url,
      options,
      (data) => {
        console.log(data);
        this.setState({ userLoggedIn: data.code === 0 });
      },
      (data) => {
        console.log(data);
        this.setState({ userLoggedIn: false });
        Global.error(data);
      }
    );
  }

  logOut() {
    const url = Global.gatewayUrl("idm/user/logout");
    const body = {
      username: Global.getSession().username,
    };
    const options = Global.options({}, body, "POST");
    Global.fetch(url, options, (data) => {
      Global.clearCookies();
      window.location.href = "/";
    });
  }
}

export default App;

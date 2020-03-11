import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./css/navbar.css";
import { Modal, Button } from "react-bootstrap";
import MyNavbar from "./components/myNavbar";

import Home from "./components/homePage";
import Error from "./components/errorPage";
import Register from "./components/registerPage";
import RegisterSuccess from "./components/registerSuccessPage";
import Login from "./components/loginPage";
import Projects from "./components/projectsPage";
import ViewProject from "./components/ViewProjectPage";

class App extends Component {
  state = {
    visible: false
  };
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
  renderModal() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

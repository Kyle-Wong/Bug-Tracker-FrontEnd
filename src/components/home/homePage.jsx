import React, { Component } from "react";
import "../../css/home.css";
class HomePage extends Component {
  state = {};
  render() {
    const { userLoggedIn } = this.props;
    return (
      <React.Fragment>
        <header
          className="w3-container w3-blue w3-center"
          style={{ padding: "128px 16px" }}
        >
          <h1 className="w3-margin w3-jumbo">Bug Tracker</h1>
          <p className="w3-xlarge">By Kyle Wong</p>
          <button
            onClick={() => {
              document.location = userLoggedIn ? "projects" : "login";
            }}
            className="w3-button w3-white w3-text-black w3-padding-large w3-large w3-margin-top"
          >
            Get Started
          </button>
        </header>

        <div className="w3-row-padding w3-padding-64 w3-container">
          <div className="w3-content">
            <div className="w3-twothird">
              <h1 className="home">Add Your Projects</h1>
              <h5 className="w3-padding-32 home">
                Add your project to the bug tracker service and begin tracking
                bugs and other issues as they appear. Developers can view the
                list of any outstanding bugs and work towards resolving them.
              </h5>

              <p className="w3-text-grey home">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="w3-third w3-center">
              <i className="fa fa-laptop-code w3-padding-64 w3-text-blue fa-10x"></i>
            </div>
          </div>
        </div>

        <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
          <div className="w3-content">
            <div className="w3-third w3-center">
              <i className="fa fa-list-ol w3-padding-64 w3-text-blue w3-margin-right fa-10x"></i>
            </div>

            <div className="w3-twothird">
              <h1 className="home">Track Active Bugs</h1>
              <h5 className="home w3-padding-32">
                Whenever you encounter a bug during development, add it to the
                bug tracker to create a record of it. Bugs can be tagged by type
                or category which developers can easily filter and search
                through. Higher priority issues can be marked so that they can
                resolved more quickly.
              </h5>

              <p className="home w3-text-grey">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>

        <footer className="w3-container w3-padding-64 w3-center w3-opacity">
          <p>
            Powered by{" "}
            <a
              href="https://www.w3schools.com/w3css/default.asp"
              target="_blank"
            >
              w3.css
            </a>
          </p>
        </footer>
      </React.Fragment>
    );
  }
}

export default HomePage;

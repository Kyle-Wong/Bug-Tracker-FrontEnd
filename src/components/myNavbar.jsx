import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Global from "../global";

class MyNavbar extends Component {
  render() {
    const { userLoggedIn } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="nav-header" href="/">
          React-Bootstrap
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto nav-items text-center">
            {userLoggedIn && <Nav.Link href="/projects">My Projects</Nav.Link>}
          </Nav>
          <Nav
            className="text-center"
            variant="pills"
            defaultActiveKey="register"
          >
            {!userLoggedIn && (
              <Nav.Item>
                <Nav.Link href="register">Sign up</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          <Nav className="text-center">{this.signInLink()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  componentDidMount() {
    //check if logged in
  }

  signInLink() {
    const { userLoggedIn, handleLogOut } = this.props;
    if (!userLoggedIn) {
      return (
        <Nav.Link eventKey={2} href="/login">
          Log In
        </Nav.Link>
      );
    } else {
      return (
        <Nav.Link
          eventKey={2}
          href=""
          onSelect={() => {
            handleLogOut();
          }}
        >
          Log Out
        </Nav.Link>
      );
    }
  }
}

export default MyNavbar;

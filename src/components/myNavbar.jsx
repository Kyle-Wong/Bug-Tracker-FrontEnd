import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
const Global = require("../global");

class MyNavbar extends Component {
  state = { userLoggedIn: false };
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="nav-header" href="/">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto nav-items">
            <Nav.Link href="/projects">My Projects</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            {!this.state.userLoggedIn && (
              <Nav.Link eventKey={2} href="/login">
                Log In
              </Nav.Link>
            )}
            {this.state.userLoggedIn && (
              <Nav.Link eventKey={2} href="">
                Log Out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  componentDidMount() {
    //check if logged in
  }
  verifySession() {
    const url = Global.gatewayUrl("verifySession");
    const body = {};
  }
  userIsLoggedIn() {}
  userNotLoggedIn() {}
}

export default MyNavbar;

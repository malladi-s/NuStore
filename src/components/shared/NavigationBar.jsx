import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const NavbarItems = [
  {
    label: "Home",
    to: "/"
  },
  {
    label: "Register",
    to: "/account/register"
  },
  {
    label: "Register",
    to: "/account/register"
  },
  {
    label: "Post",
    to: "/postproducts"
  }
];

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    var { isOpen } = this.state;

    return (
      <Navbar dark expand="md">
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto mr-auto" navbar>
            {NavbarItems.map((header, index) => (
              <NavItem key={index}>
                <NavLink tag={Link} to={header.to}>
                  {header.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;

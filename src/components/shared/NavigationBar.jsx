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
    label: "Profile ",
    to: "/profilePage"
  },
  {
    label: "Furniture ",
    to: "/category/Furniture"
  },
  {
    label: "Electronics",
    to: "/category/Electronics"
  },

  {
    label: "Fashion",
    to: "/category/Fashion"
  },
  {
    label: "Shoes",
    to: "/category/Shoes"
  },
  {
    label: "Books",
    to: "/category/Books"
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

import React from "react";
import { Link } from "react-router-dom";

import nustoreImage from "../../img/logo-1.png";
import searchImg from "../../img/icons/magnify.svg";
import accountImg from "../../img/icons/account.svg";

import {
  Modal,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { Nav, NavItem } from "reactstrap";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    // this.logOutClick = this.logOutClick.bind(this);
    // this.renderGreeting = this.renderGreeting.bind(this);
    this.toggleRegisterAccountModal = this.toggleRegisterAccountModal.bind(
      this
    );
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      isOpen: false,
      isRegisterAccountModalOpen: false
    };
  }

  logOutClick(event) {
    event.preventDefault();
    this.props.logUserOutFunction();
  }

  renderGreeting(name) {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <span className="nav-link">
            Welcome, {name + " "}|{" "}
            <a href="/logout" onClick={this.logOutClick}>
              Log Out
            </a>
          </span>
        </NavItem>
      </Nav>
    );
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleRegisterAccountModal() {
    this.setState({
      isRegisterAccountModalOpen: !this.state.isRegisterAccountModalOpen
    });
  }

  render() {
    const { isLoggedIn, firstName, username } = this.props.authentication;
    const { toggleRegisterAccountModal, isRegisterAccountModalOpen } = this;

    return (
      <div className="container pt-3">
        <div className="row">
          <div className="col-lg-2 text-center text-lg-left">
            <img src={nustoreImage} height="50" alt="" />
          </div>

          <div className="col-xl-6 col-lg-5">
            <form className="header-search-form">
              <input type="text" placeholder="Search ...." />
              <button>
                <img src={searchImg} />
              </button>
            </form>
          </div>

          <div className="col-xl-4 col-lg-5 m-auto">
            <div className="user-panel d-flex justify-content-center">
              {isLoggedIn ? null : (
                <div className="up-item">
                  <a className="link">
                    <img src={accountImg} width="32" height="32" />
                    Sign In{" "}
                  </a>
                  {"  |  "}
                  <Link
                    to="/account/register"
                    onClick={toggleRegisterAccountModal}
                    className="link"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

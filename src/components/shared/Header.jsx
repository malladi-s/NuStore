import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
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
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";

import { incrementLoader, decrementLoader } from "../../actions/loader";
import {
  loginAttempt,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure
} from "../../actions/authentication";

import nustoreImage from "../../img/logo-1.png";
import searchImg from "../../img/icons/magnify.svg";
import accountImg from "../../img/icons/account.svg";
import loginImg from "../../img/icons/login.svg";
import githubImg from "../../img/icons/github.svg";
import amazonImg from "../../img/icons/Amazon.svg";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logOutClick = this.logOutClick.bind(this);
    this.renderLoginModal = this.renderLoginModal.bind(this);
    this.toggleRegisterAccountModal = this.toggleRegisterAccountModal.bind(
      this
    );
    this.toggle = this.toggle.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.onChangesearch = this.onChangesearch.bind(this);

    this.state = {
      isOpen: false,
      isRegisterAccountModalOpen: false,
      modal: false,
      username: "",
      password: "",
      search: ""
    };
  }

  async logOutClick(event) {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(incrementLoader());

    await fetch("/api/authentication/logout", {
      method: "GET",
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          toast.error("Logout failed. Please Try again.");
        }
      })
      .catch(error => {
        dispatch(logoutFailure(new Error(error)));
        toast.error("Logout failed. Please Try again.");
      });

    dispatch(decrementLoader());
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  onChangesearch(e) {
    this.setState({ search: e.target.value });
    console.log("In change search" + this.state.search);
  }

  async handleValidSubmit() {
    const { dispatch } = this.props;

    const formData = {
      username: this.state.username,
      password: this.state.password
    };

    dispatch(incrementLoader());

    dispatch(loginAttempt());

    await fetch("/api/authentication/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json == null || (json && json.error)) {
          dispatch(
            loginFailure(
              new Error("Email or Password Incorrect. Please Try again.")
            )
          );
          toast.error("Email or Password Incorrect. Please Try again.");
        } else {
          dispatch(loginSuccess(json));
          this.setState({
            modal: false
          });
          toast.success(`Welcome ${json.firstName}`);
        }
      })
      .catch(error => {
        toast.error("Email or Password Incorrect. Please Try again.");
        dispatch(loginFailure(new Error(error)));
      })
      .finally(function() {
        dispatch(decrementLoader());
      });
  }

  renderLoginModal() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Login</ModalHeader>
        <ModalBody>
          <div className="row justify-content-center mt-3">
            <AvForm className="w-75" onValidSubmit={this.handleValidSubmit}>
              <AvGroup>
                <Label for="username">Username</Label>
                <AvInput
                  id="username"
                  name="username"
                  onChange={this.handleUsernameChange}
                  placeholder="username"
                  required
                  type="text"
                  value={this.state.username}
                />
              </AvGroup>
              <AvGroup>
                <Label for="userPassword">Password</Label>
                <AvInput
                  id="userPassword"
                  name="password"
                  onChange={this.handlePasswordChange}
                  placeholder="password"
                  required
                  type="password"
                  value={this.state.password}
                />
                <AvFeedback>Password is required to log in</AvFeedback>
                <span>
                  <Link onClick={this.toggle} to="/account/reset-password">
                    Forgot your password?
                  </Link>
                </span>
              </AvGroup>
              <Button color="primary">Log In</Button>

              <a href="/auth/github">
                <img src={githubImg} className="pl-2" />
              </a>

              <a href="/auth/amazon">
                <img
                  src={amazonImg}
                  className="pl-2"
                  style={{ marginTop: "2px" }}
                />
              </a>
            </AvForm>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  toggle() {
    if (!this.state.modal) {
      this.setState({
        username: "",
        password: ""
      });
    }

    this.setState({
      modal: !this.state.modal
    });
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
      <div className="header-top">
        <div className="container">
          {this.renderLoginModal()}
          <div className="row">
            <div className="col-lg-2 text-center text-lg-left">
              <Link to="/" className="link">
                <img src={nustoreImage} height="50" alt="" />
              </Link>
            </div>

            <div className="col-xl-6 col-lg-5">
              <form className="header-search-form">
                <input
                  type="text"
                  placeholder="Search ...."
                  onChange={this.onChangesearch}
                />
                <Link to={`/search/${this.state.search}`}>
                  <button>
                    <img src={searchImg} />
                  </button>
                </Link>
              </form>
            </div>

            <div className="col-xl-4 col-lg-5 m-auto">
              <div className="user-panel d-flex justify-content-center">
                {isLoggedIn ? (
                  <div className="up-item">
                    <a className="link" onClick={this.logOutClick}>
                      <img src={accountImg} width="32" height="32" /> Log Out{" "}
                      {firstName}
                    </a>
                    {"  |  "}
                    <Link to="/messages" className="link">
                      Messages
                    </Link>
                    {"  |  "}
                    <Link to="/postproducts" className="link">
                      Post
                    </Link>
                  </div>
                ) : (
                  <div className="up-item">
                    <a className="link" onClick={this.toggle}>
                      <img src={loginImg} width="32" height="32" />
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

export default connect(mapStateToProps)(Header);

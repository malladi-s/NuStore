import "whatwg-fetch";
import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "./socket";

import RegisterPage from "./components/account/RegistrationContainer.jsx";
import RegistrationSuccessPage from "./components/account/RegistrationSuccessContainer.jsx";
import Header from "./components/shared/Header.jsx";
import ProuductList from "./components/home/ProductList.jsx";
import ResetPasswordPage from "./components/account/ResetPasswordPageContainer";
import ChangePasswordPage from "./components/account/ChangePasswordPageContainer";
import NavigationBar from "./components/shared/NavigationBar";

import { checkSession } from "./actions/authentication.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: socket()
    };

    this.checkUserSession = this.checkUserSession.bind(this);
  }

  // TODO : Replace with componentDidMount
  UNSAFE_componentWillMount() {
    this.checkUserSession();
  }

  componentWillReceiveProps(prevProps) {
    if (
      prevProps.authentication.isLoggedin &&
      prevProps.authentication.isLoggedin != this.props.isLoggedin
    ) {
      console.log("login changed");
    }
  }

  checkUserSession() {
    this.props.dispatch(checkSession());
  }

  render() {
    const { authentication } = this.props;
    return (
      <Router>
        <div className="wrapper">
          <Header authentication={authentication} />
          <NavigationBar></NavigationBar>
          <section className="page-content container-fluid">
            <Route exact path="/" component={HomePage} />
            <Route
              path="/account/change-password/:hash"
              component={ChangePasswordPage}
            />
            <Route exact path="/account/register" component={RegisterPage} />
            <Route
              exact
              path="/account/registration-success"
              component={RegistrationSuccessPage}
            />
            <Route
              exact
              path="/account/reset-password"
              component={ResetPasswordPage}
            />
            <Route path="/profile" component={Profile} />
          </section>
        </div>
        <ToastContainer autoClose={3000} />
      </Router>
    );
  }
}

function HomePage() {
  return <ProuductList />;
}

function Profile() {
  return <div>Home Page</div>;
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

export default connect(mapStateToProps)(App);

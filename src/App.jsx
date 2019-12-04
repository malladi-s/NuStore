import "whatwg-fetch";
import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";

import RegisterPage from "./components/account/RegistrationContainer.jsx";
import RegistrationSuccessPage from "./components/account/RegistrationSuccessContainer.jsx";
import Header from "./components/shared/Header.jsx";

import { checkSession } from "./actions/authentication.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.checkUserSession = this.checkUserSession.bind(this);
  }

  // TODO : Replace with componentDidMount
  UNSAFE_componentWillMount() {
    // Before the component mounts, check for an existing user session
    this.checkUserSession();
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
          <section className="page-content container-fluid">
            <Route exact path="/" component={HomePage} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/account/register" component={RegisterPage} />
            <Route
              exact
              path="/account/registration-success"
              component={RegistrationSuccessPage}
            />
          </section>
        </div>
      </Router>
    );
  }
}

function HomePage() {
  return <div>Home Page</div>;
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

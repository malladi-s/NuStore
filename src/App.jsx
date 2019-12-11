import "whatwg-fetch";
import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegisterPage from "./components/account/RegistrationContainer.jsx";
import RegistrationSuccessPage from "./components/account/RegistrationSuccessContainer.jsx";
import Header from "./components/shared/Header.jsx";
import Messenger from "./components/messages/Messenger/MessengerContainer";
import ProuductList from "./components/home/ProductList.jsx";
import ResetPasswordPage from "./components/account/ResetPasswordPageContainer";
import ChangePasswordPage from "./components/account/ChangePasswordPageContainer";
import NavigationBar from "./components/shared/NavigationBar";
import Carousal from "./components/home/Carousal.jsx";
import postProducts from "./components/products/Postproduct";

import { checkSession } from "./actions/authentication.js";
import ProductDetails from "./components/product/ProductDetails";

class App extends React.Component {
  constructor(props) {
    super(props);
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
          <section className="page-content container-fluid p-0">
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
            <Route exact path="/messages" component={Messenger} />
            <Route path="/postproducts" exact component={postProducts} />
            <Route exact path="/product/:id" component={ProductDetails} />
          </section>
        </div>
        <ToastContainer autoClose={3000} />
      </Router>
    );
  }
}

function HomePage() {
  return (
    <div>
      <Carousal />
      <ProuductList />
    </div>
  );
}

function Profile() {
  return <div>Home Page</div>;
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

function Product() {
  // return (<div>product details</div>);
  // return (<div><Carousal /><ProductDetails /></div>);
  return (
    <div>
      <ProductDetails />
    </div>
  );
}

export default connect(mapStateToProps)(App);

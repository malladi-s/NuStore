import "whatwg-fetch";
import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Adv from "./components/home/adv";
import RegisterPage from "./components/account/RegistrationContainer.jsx";
import RegistrationSuccessPage from "./components/account/RegistrationSuccessContainer.jsx";
import Header from "./components/shared/Header.jsx";
import Messenger from "./components/messages/Messenger/MessengerContainer";
import ProuductList from "./components/home/ProductList.jsx";
import ResetPasswordPage from "./components/account/ResetPasswordPageContainer";
import ChangePasswordPage from "./components/account/ChangePasswordPageContainer";
import NavigationBar from "./components/shared/NavigationBar";
import Carousal from "./components/home/Carousal.jsx";
import PostProducts from "./components/products/Postproduct";
import Banner from "./components/profiles/Banner";
import About from "./components/profiles/About";
import Friends from "./components/profiles/Friends";
import Products from "./components/profiles/Products";
import Footer from "./components/home/footer";
import { checkSession } from "./actions/authentication.js";
import ProductDetails from "./components/product/ProductDetails";
import CenterMode from "./components/home/ProductSlick";

import UserProfileComponent from "./components/userprofile/UserProfile";
import ProductSearch from "./components/products/productsearch";

import ProductCategory from "./components/products/productcat";

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
              path="/profilepage"
              render={props => (
                <ProfilePage authentication={authentication} {...props} />
              )}
            />
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
            <Route
              path="/userprofile/:userId"
              render={props => (
                <UserProfile authentication={authentication} {...props} />
              )}
            />
            <Route exact path="/messages" component={Messenger} />
            <Route path="/postproducts" exact component={post_Products} />
            <Route
              exact
              path="/product/:id"
              render={props => (
                <ProductDetailsContainer
                  authentication={authentication}
                  {...props}
                />
              )}
            />
            <Route exact path="/search/:random" component={ProductSearch} />
            <Route exact path="/category/:random" component={ProductCategory} />
          </section>
          <Footer />
        </div>
        <ToastContainer autoClose={3000} />
      </Router>
    );
  }
}

function post_Products() {
  return (
    <div className="fargment_id">
      <PostProducts />
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <Carousal />

      <CenterMode category="Electronics" />
      <CenterMode category="Furniture" />
      <Adv name1="open.jpeg" />
      <CenterMode category="Shoes" />
      <CenterMode category="Fashion" />
      <Adv name1="open.jpeg" />
      <CenterMode category="Books" />

      <ProuductList />
    </div>
  );
}

function ProfilePage(props) {
  if (!props.authentication.isLoggedIn) {
    return <p>Not Authorised!</p>;
  }
  return (
    <div>
      <Banner userId={props.authentication.id} />
      <hr />
      <About about={props.authentication.about} />
      <Friends userId={props.authentication.id} />
      <hr />
      <Products type="My Products" userId={props.authentication.username} />
      <Products type="WishList" userId={props.authentication.id} />
    </div>
  );
}

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.authentication.isLoggedIn) {
      return <p>Not Authorised!</p>;
    }
    return <UserProfileComponent {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

function ProductDetailsContainer(props) {
  if (!props.authentication.isLoggedIn) {
    return <p>Not Authorised!</p>;
  }
  return <ProductDetails {...props} />;
}

export default connect(mapStateToProps)(App);

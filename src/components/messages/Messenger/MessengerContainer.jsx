import React from "react";
import { connect } from "react-redux";

import Messenger from "./index";

export class MessengerPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.username = null;
    if (this.props.location.state && this.props.location.state.username) {
      this.username = this.props.location.state.username;
    }
  }

  render() {
    const { isLoggedIn } = this.props.authentication;
    let user = null;

    if (isLoggedIn) {
      user = {
        ...this.props.authentication
      };
    }

    // User needs to be logged out to see this page
    if (!isLoggedIn) {
      return <p>Not authorized!</p>;
    }

    // Otherwise display the form
    return <Messenger user={user} username={this.username} />;
  }
}

const mapStateToProps = state => ({ authentication: state.authentication });

export default connect(mapStateToProps)(MessengerPageContainer);

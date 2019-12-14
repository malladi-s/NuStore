import React from "react";
import { connect } from "react-redux";

import Messenger from "./index";

export class MessengerPageContainer extends React.Component {
  constructor(props) {
    super(props);
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
    return <Messenger user={user} {...this.props} />;
  }
}

const mapStateToProps = state => ({ authentication: state.authentication });

export default connect(mapStateToProps)(MessengerPageContainer);

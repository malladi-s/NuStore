import React from 'react';
import { connect } from "react-redux";


render() {
    const { isLoggedIn, firstName, lastName, username } = this.props.authentication;
    if (!isLoggedIn) {
        return <p>Not authorized!</p>;
    }
    return <div>{this.()}</div>;
}

const mapStateToProps = state => ({ authentication: state.authentication });

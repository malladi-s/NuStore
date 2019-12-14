import React, { Component } from "react";
import logo from "../../img/ad2.png";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
      followers: [],
      follows: []
    };
  }

  componentDidMount() {
    fetch(`/api/users/${this.props.userId}`, {
      method: "GET",
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json) {
          this.setState({
            logo: json.img,
            followers: json.followers,
            follows: json.follows
          });
        } else {
        }
      })
      .catch(error => toast(error));
  }

  render() {
    const { firstName, lastName, username } = this.props.authentication;

    return (
      <section className="container-banner">
        <div className="sec1">
          <a className="link">
            <img
              id="profilepic"
              src={this.state.logo}
              width="160"
              height="160"
              alt="profilepic"
            />
          </a>
        </div>
        <div className="sec2">
          <div className="profileRow1">
            <h1 id="row1f1">{username}</h1>
            <button id="row1f2">Edit Profile</button>
          </div>
          <div className="profileRow2">
            <h5 id="row2f2">{this.state.followers.length} followers</h5>
            <h5 id="row2f3">{this.state.follows.length} following</h5>
            <button id="row1f2">Follow</button>
          </div>
          <div className="profileRow3">
            <h4>
              {firstName} {lastName}
            </h4>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => ({ authentication: state.authentication });
export default connect(mapStateToProps)(Banner);

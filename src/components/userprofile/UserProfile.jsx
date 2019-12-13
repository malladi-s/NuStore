import React, { Component } from "react";
import { toast } from "react-toastify";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      about: "",
      email: "",
      phonenumber: "",
      firstName: "",
      lastName: "",
      followers: []
    };
  }

  componentDidMount() {
    fetch(`/api/users/${this.props.match.params.userId}`, {
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
            img: json.img,
            follows: json.follows,
            about: json.about,
            email: json.email,
            phonenumber: json.phonenumber,
            firstName: json.firstName,
            lastName: json.lastName
          });
        } else {
          toast("Failed to fetch user info.");
        }
      })
      .catch(error => toast("Failed."));

    fetch(`/api/users/getFollows/${this.props.match.params.userId}`, {
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
            followers: json.follows
          });
        } else {
          toast("Failed to fetch user info.");
        }
      })
      .catch(error => toast("Failed to fetch user info."));
  }

  render() {
    if (!this.props.authentication.isLoggedIn) {
      return <p>Not Authorised!</p>;
    }
    return (
      <div className="profile-container">
        <div className="profile-wrapper">
          <div className="left">
            <img src={this.state.img} alt="user" width="100" />
            <h4>
              {this.state.firstName || ""} {this.state.lastName || ""}
            </h4>
            <p></p>
          </div>
          <div className="right">
            <div className="info">
              <h3>Information</h3>
              <div className="info_data">
                <div className="data">
                  <h4>Email</h4>
                  <p>{this.state.email}</p>
                </div>
                <div className="data">
                  <h4>Phone</h4>
                  <p>{this.state.phonenumber}</p>
                </div>
              </div>
            </div>

            <div className="projects">
              <h3>About</h3>
              <div className="projects_data">
                <p>{this.state.about}</p>
              </div>
            </div>
          </div>
        </div>

        {this.state.followers.map(follower => (
          <div className="mt-5 mb-5">
            <h3> Followers </h3>
            <div className="box mt-5">
              <div className="card">
                <div className="imgBx">
                  <img src={follower.img} alt="images" />
                </div>
                <div className="details">
                  <h2>
                    {follower.firstName}
                    <br />
                    <span>{follower.username}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

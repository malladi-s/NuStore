import React, { Component } from "react";
import logo from "../../img/ad3.png";
import logo1 from "../../img/ad4.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: []
    };
  }

  componentDidMount() {
    fetch(`/api/users/getFollowers/${this.props.userId}`, {
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
            followers: json.followers
          });
        } else {
        }
      })
      .catch(error => toast.error("Failed to fetch followers information."));
  }

  render() {
    return (
      <section id="skillheader" className="flex-friends-container">
        {this.state.followers.map(follower => (
          <div key={follower.username}>
            <Link to={`userprofile/${follower._id}`}>
              <img
                className="imgrounder"
                src={follower.img}
                width="100"
                height="100"
                alt="python"
              />
            </Link>
          </div>
        ))}
      </section>
    );
  }
}

export default Friends;

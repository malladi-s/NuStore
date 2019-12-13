import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section id="container-about" className="container-about">
        <h1>Bio</h1>
        <p>{this.props.about}</p>
      </section>
    );
  }
}

export default About;

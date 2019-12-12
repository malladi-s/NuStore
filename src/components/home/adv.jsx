import React, { Component } from "react";

export default class Adv extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const divprop = {
      margin: "20px",
      height: "300px",
      "background-color": "grey"
    };
    return (
      <div className="container-fluid">
        <div style={divprop}>
          <p>Anddv</p>
        </div>
      </div>
    );
  }
}

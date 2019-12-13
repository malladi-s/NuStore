import React, { Component } from "react";

export default class Adv extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const divprop = {
      margin: "20px",

      "background-color": "white"
    };

    const smalldiv1 = {
      height: "300px",
      postion: "relative",
      display: "block",
      "margin-left": "auto",
      "margin-right": "auto",
      width: "100%"
    };

    const pst = {
      "text-align": "center",
      "font-weight": "bold",
      "font-size": "20px",
      margin: "9px"
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <p style={pst}>24/7 Unlimited Shopping</p>
            <img style={smalldiv1} src={this.props.name1} />
          </div>
        </div>
      </div>
    );
  }
}

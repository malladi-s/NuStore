import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CenterMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    axios
      .get(
        `http://localhost:${process.env.port}/api/products/category/${this.props.category}`
      )
      .then(response => {
        console.log("response" + response.data);
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const settings = {
      className: "center",

      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      arrows: true
    };
    const imgstyle = {
      height: "250px",
      width: "90%"
    };
    const fontstyle = {
      "font-size": "17px"
    };
    const hstyle = {
      textAlign: "center",
      "font-size": "27px",
      color: "black",
      margin: "20px"
    };

    return (
      <div className="bord">
        <h2 style={hstyle}>{this.props.category}</h2>
        <hr></hr>
        <Slider {...settings}>
          {this.state.products.map(currentproduct => {
            console.log(currentproduct.description);
            return (
              <div className="slick-div">
                <h3>
                  <Link to={`/product/${this.state.id}`}>
                    <a href="">
                      <img style={imgstyle} src={currentproduct.image} />
                    </a>
                  </Link>
                  <p>{currentproduct.prodname}</p>
                  <p style={fontstyle}>${currentproduct.price}</p>
                </h3>

                {/* <h3>{currentproduct.price}</h3> */}
              </div>
            );
          })}

          {/* <div>
            <h3>Krishna</h3>
          </div>
          <div>
            <h3>Manchukonda</h3>
          </div>
          <div>
            <h3>From</h3>
          </div>
          <div>
            <h3>Guntur</h3>
          </div>
          <div>
            <h3>6</h3>
          </div> */}
        </Slider>
      </div>
    );
  }
}

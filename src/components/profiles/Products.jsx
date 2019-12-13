import React, { Component } from "react";
import Cards from "../home/Card";
import axios from "axios";

class myProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    if (this.props.type === "WishList") {
      axios
        .get(
          `http://localhost:${process.env.port}/api/products/wishlist/${this.props.userId}`
        )
        .then(response => {
          console.log("response" + response.data);
          this.setState({ products: response.data.wishlist });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .get(
          `http://localhost:${process.env.port}/api/products/posted/${this.props.userId}`
        )
        .then(response => {
          console.log("response" + response.data);
          this.setState({ products: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  productList() {
    return this.state.products.map(currentproduct => {
      return <Cards product={currentproduct} key={currentproduct._id} />;
    });
  }
  render() {
    const divbor = {
      border: "1px solid black",
      width: "100%"
    };
    return (
      <div style={divbor}>
        <h2>{this.props.type}</h2>
        {this.productList()}
      </div>
    );
  }
}

export default myProducts;

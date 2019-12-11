import React, { Component } from "react";
import axios from "axios";
import Cards from "./Card.jsx";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:${process.env.port}/api/products`)
      .then(response => {
        console.log("response" + response.data);
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  productList() {
    return this.state.products.map(currentproduct => {
      return <Cards product={currentproduct} key={currentproduct._id} />;
    });
  }
  render() {
    return <div>{this.productList()}</div>;
  }
}

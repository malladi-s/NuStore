import React, { Component } from "react";
import axios from "axios";
import Cards from "../home/Card";

export default class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.rerender = this.rerender.bind(this);
  }

  rerender(random) {
    axios
      .get(
        `http://localhost:${process.env.port}/api/products/category/${random ||
          this.props.match.params.random}`
      )
      .then(response => {
        console.log("catresponse" + response.data);
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.random) {
      this.rerender(nextProps.match.params.random);
    }
  }

  componentDidMount() {
    this.rerender();
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

import React, { Component } from "react";

import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle
} from "reactstrap";
// import {
//     withRouter
//   } from 'react-router-dom'
// import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.prod_details = this.prod_details.bind(this);
  }

  prod_details(e) {
    //let history = useHistory();

    console.log("inside this function");
    e.preventDefault();

    var id = this.props.product._id;
    //history.push(`/product/${id}`)
    // this.context.router.transitionTo(`/product/${id}`);
  }

  render() {
    // imgsrc = require(`/${this.props.product.image}`);
    return (
      <div className="single_card">
        <Card style={{ width: "18rem" }}>
          <CardImg
            top
            width="200px"
            height="180px"
            src={this.props.product.image}
          />

          <CardBody>
            <CardTitle>{this.props.product.prodname}</CardTitle>
            <CardText>{this.props.product.description}</CardText>
            <Link to={`/product/${this.props.product._id}`}>
              <Button color="primary">View Details</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

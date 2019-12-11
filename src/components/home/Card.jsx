import React, { Component } from "react";
import { Button, Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";
// import {
//     withRouter
//   } from 'react-router-dom'
// import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.product._id
    };
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
    return (
      <div className="single_card">
        <Card style={{ width: "18rem" }}>
          <CardImg
            top
            width="100%"
            src="/assets/318x180.svg"
            src="https://cdn.vox-cdn.com/thumbor/T49kxT-ZhzKjyWWWkVYiOIyAOv4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/11249379/jbareham_171101_2099_A_0088_02.jpg"
          />
          <CardBody>
            <CardTitle>{this.props.product.prodname}</CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Link to={`/product/${this.state.id}`}>
              <Button color="primary">View Details</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";

class Postproduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeProd = this.onChangeProd.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeCat = this.onChangeCat.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      prodname: "",
      description: "",
      price: 0,
      date: new Date(),
      image: "",
      issold: false,
      category: "Furniture",
      totprod: []
    };
  }
  onChangeProd(e) {
    this.setState({
      prodname: e.target.value
    });
  }
  onChangeDesc(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  onChangeCat(e) {
    this.setState({
      category: e.target.value
    });
  }
  onChange(e) {
    this.setState({
      image: e.target.files[0].name
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const product = {
      prodname: this.state.prodname,
      username: this.props.authentication.username,
      description: this.state.description,
      price: this.state.price,
      date: this.state.date,
      category: this.state.category,
      image: this.state.image,
      isSold: this.state.issold
    };

    fetch("/api/products/add", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status === 200) {
          toast.success(`Product uploaded`);
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json) {
          console.log(json);
        } else {
          toast.error("eror in Backend");
          console.log("eror in Backend ");
        }
      })
      .catch(error => {
        toast.error("No details to fetch");
        console.log("fetch failed");
        t;
      });
  }

  render() {
    const { isLoggedIn } = this.props.authentication;

    if (!isLoggedIn) {
      return <p>Not authorized. Please login.</p>;
    }

    return (
      <Fragment>
        <AvForm className="frm" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product</label>
            <AvInput
              id="product_name"
              name="prodname"
              onChange={this.onChangeProd}
              placeholder="Product name here.."
              required
              type="text"
              errorMessage="Please enter the name"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              id="product_cat"
              onChange={this.onChangeCat}
            >
              <option>Furniture</option>
              <option>Fashion </option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Shoes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <AvInput
              id="product_dewsc"
              name="product_dewsc"
              onChange={this.onChangeDesc}
              placeholder="Product Description goes here.."
              required
              type="textarea"
              errorMessage="Description is required"
            />
          </div>
          <div className="form-group">
            <AvInput
              id="product_price"
              name="product_price"
              onChange={this.onChangeDesc}
              placeholder="Product Description goes here.."
              required
              type="number"
              errorMessage="Set the price of the product"
            />
          </div>

          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={this.onChange}
            />
            <label className="custom-file-label">{this.state.image}</label>
          </div>

          <div className="sub">
            <label>Browse Images</label>
            <input
              type="submit"
              value="upload"
              className="btn btn-primary btn-block mt-4"
            />
          </div>
        </AvForm>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

export default connect(mapStateToProps)(Postproduct);

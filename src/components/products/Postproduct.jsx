import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

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
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json) {
          console.log(json);
        } else {
          console.log("eror in Backend ");
        }
      })
      .catch(error => {
        console.log("fetch failed");
      });
  }

  render() {
    const { isLoggedIn } = this.props.authentication;

    if (!isLoggedIn) {
      return <p>Not authorized. Please login.</p>;
    }

    return (
      <Fragment>
        <form className="frm" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product</label>
            <input
              type="text"
              className="form-control"
              id="product_name"
              onChange={this.onChangeProd}
              placeholder="product name here.."
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
            <input
              type="text"
              className="form-control"
              id="product_dewsc"
              placeholder="Product Description goes here.."
              onChange={this.onChangeDesc}
            />
          </div>
          <div className="form-group">
            <label>Product price</label>
            <input
              type="text"
              className="form-control"
              id="product_price"
              placeholder="Set the price of the product"
              onChange={this.onChangePrice}
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
            <input
              type="submit"
              value="upload"
              className="btn btn-primary btn-block mt-4"
            />
          </div>
        </form>
      </Fragment >
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

export default connect(mapStateToProps)(Postproduct);

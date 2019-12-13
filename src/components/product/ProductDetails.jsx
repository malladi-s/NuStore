import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Magnifier from "react-magnifier";
import chatIcon from "../../img/icons/chat.svg";
import Card from "../home/Card";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  InstapaperIcon
} from "react-share";

const shareOptions = {
  title: "Title",
  message: "Message to share", // Note that according to the documentation at least one of "message" or "url" fields is required
  url: "www.example.com",
  subject: "Subject"
};

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      prodjson: "",
      prod_id: "",
      seller: "",
      description: "",
      price: "",
      isSold: "",
      category: "",
      image: "",
      firstName: "", // User
      phone: "",
      email: "",
      userId: "",
      favorite: false,
      products: [],
      posterUsername: ""
    };
    this.onFavToggle = this.onFavToggle.bind(this);
    this.productList = this.productList.bind(this);
    this.navigateToChat = this.navigateToChat.bind(this);
  }

  navigateToChat() {
    const usernameOfSeller = this.state.posterUsername;
    this.props.history.push({
      pathname: "/messages",
      state: { sellerName: usernameOfSeller }
    });
  }

  componentDidUpdate(nextProps) {
    if (
      nextProps.location &&
      this.props.location.pathname != nextProps.location.pathname
    ) {
      // this.forceUpdate();
      this._isMounted = true;

      let productId = nextProps.match.params.id;

      axios
        .get("/api/products/" + productId)
        .then(response => {
          console.log("response" + response.data);
          this.setState({
            prodjson: response.data,
            product: response.data.prodname,
            price: response.data.price,
            description: response.data.description,
            seller: response.data.username,
            isSold: response.data.isSold,
            category: response.data.category,
            image: response.data.image
          });

          axios
            .get("/api/products/category/" + response.data.category)
            .then(response => {
              this.setState({ products: response.data });
            })
            .catch(error => {
              console.log(error);
            });

          fetch(`/api/users/username/${response.data.username}`, {
            method: "GET",
            credentials: "same-origin"
          })
            .then(response => {
              if (response.status === 200) {
                return response.json();
              }
              return null;
            })
            .then(response => {
              this.setState({
                firstName: response.firstName, // User
                phone: response.phone,
                email: response.email,
                userId: response._id,
                posterUsername: response.username
              });

              fetch(
                `/api/products/isInWishlist/${productId}?userId=${response._id}`,
                {
                  method: "GET",
                  credentials: "same-origin"
                }
              )
                .then(response => {
                  if (response.status === 200) {
                    return response.json();
                  }
                  return null;
                })
                .then(favResponse => {
                  this.setState({
                    favorite: favResponse.isInWishList
                  });
                });
            })
            .catch(error => {
              console.log("catch");
            });

          console.log(JSON.stringify(this.state.product));
          this.setState({
            prodjson: JSON.stringify(this.state.product)
          });
          axios
            .get("/api/products/category/" + this.state.category)
            .then(response => {
              console.log("response" + response.data);
              // if (this._isMounted) {
              this.setState({
                // prodjson: response.data,
                // product: response.data.prodname,
                // price: response.data.price,
                // description: response.data.description,
                // seller: response.data.username,
                // isSold: response.data.isSold,
                // category: response.data.category
              });
              // }
              console.log(JSON.stringify(this.state.product));
              this.setState({
                prodjson: JSON.stringify(this.state.product)
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    axios
      .get("/api/products/" + this.props.match.params.id)
      .then(response => {
        console.log("response" + response.data);
        this.setState({
          prodjson: response.data,
          product: response.data.prodname,
          price: response.data.price,
          description: response.data.description,
          seller: response.data.username,
          isSold: response.data.isSold,
          category: response.data.category,
          image: response.data.image
        });

        axios
          .get("/api/products/category/" + response.data.category)
          .then(response => {
            this.setState({ products: response.data });
          })
          .catch(error => {
            console.log(error);
          });

        fetch(`/api/users/username/${response.data.username}`, {
          method: "GET",
          credentials: "same-origin"
        })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
            return null;
          })
          .then(response => {
            this.setState({
              firstName: response.firstName, // User
              phone: response.phone,
              email: response.email,
              userId: response._id,
              posterUsername: response.username
            });

            fetch(
              `/api/products/isInWishlist/${productId}?userId=${response._id}`,
              {
                method: "GET",
                credentials: "same-origin"
              }
            )
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                }
                return null;
              })
              .then(favResponse => {
                this.setState({
                  favorite: favResponse.isInWishList
                });
              });
          })
          .catch(error => {
            console.log("catch");
          });

        console.log(JSON.stringify(this.state.product));
        this.setState({
          prodjson: JSON.stringify(this.state.product)
        });
        axios
          .get("/api/products/category/" + this.state.category)
          .then(response => {
            console.log("response" + response.data);
            // if (this._isMounted) {
            this.setState({
              // prodjson: response.data,
              // product: response.data.prodname,
              // price: response.data.price,
              // description: response.data.description,
              // seller: response.data.username,
              // isSold: response.data.isSold,
              // category: response.data.category
            });
            // }
            console.log(JSON.stringify(this.state.product));
            this.setState({
              prodjson: JSON.stringify(this.state.product)
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onFavToggle() {
    this.setState({
      favorite: !this.state.favorite
    });

    const favBody = {
      userId: this.state.userId,
      productId: this.props.match.params.id
    };

    fetch("/api/products/wishlist/toggle", {
      method: "POST",
      body: JSON.stringify(favBody),
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
          toast.success(`Added to wishlist.`);
        } else {
          toast.error(`Failed to add to wishlist.`);
        }
      })
      .catch(error => {
        toast.error(`Failed to add to wishlist.`);
      });
  }

  productList() {
    // alert("entered product list");
    return this.state.products
      .filter(product => product._id != this.props.match.params.id)
      .map(currentproduct => {
        return <Card product={currentproduct} key={currentproduct._id} />;
      });
  }

  render() {
    // return (<div>product page</div>)
    // return (
    //     <TouchableOpacity onPress={this.onSharePress} >
    //         <Text>Share data</Text>
    //     </TouchableOpacity>
    // );

    const shareUrl = `http://127.0.0.1:3000`;
    const title = this.state.product;

    return (
      <div>
        <div className="profile-wrapper productWrapper">
          <div className="left">
            <Magnifier
              src={this.state.image}
              className="productImg"
              alt="user"
              width="100"
            />
            <h4>{this.state.product}</h4>
            <span
              className={
                this.state.favorite ? "favIcon fav" : "favIcon not-fav"
              }
              onClick={this.onFavToggle}
            >
              ❤
            </span>
            <div className="d-flex justify-content-around socialIcons">
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <InstapaperShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <InstapaperIcon size={32} round />
              </InstapaperShareButton>
            </div>
          </div>
          <div className="right">
            <div className="info">
              <h3>Seller Information</h3>
              <div className="info_data">
                <div className="data">
                  <h4>
                    Name{" "}
                    <img
                      src={chatIcon}
                      width="16"
                      height="16"
                      onClick={this.navigateToChat}
                    />
                  </h4>
                  <p className="text-truncate">{this.state.firstName} </p>
                </div>
                <div className="data">
                  <h4>Email</h4>
                  <p className="text-truncate" title={this.state.email}>
                    {this.state.email}
                  </p>
                </div>
                <div className="data">
                  <h4>Phone</h4>
                  <p className="text-truncate" title={this.state.phone}>
                    {this.state.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="projects">
              <h3>Product Description</h3>
              <div className="projects_data">
                <p className="product-description">{this.state.description}</p>
              </div>
            </div>

            <div className="projects">
              <h3>Price</h3>
              <div className="projects_data">
                <p className="price">$ {this.state.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-3">
          <h3 className="text-center">View similar products</h3>
          {this.productList()}
        </div>
      </div>
    );
  }
}

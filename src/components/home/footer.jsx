import React, { Component } from "react";

export default class Footeru extends Component {
  render() {
    const spanstyle = {
      position: "relative",
      top: "12px"
    };
    return (
      <div>
        <section className="footer-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="footer-widget about-widget">
                  <ul>
                    <li>
                      <a href="">About Us</a>
                    </li>
                    <li>
                      <a href="">Jobs</a>
                    </li>
                    <li>
                      <a href="">Blog</a>
                    </li>
                    <li>
                      <a href="">Terms of Use</a>
                    </li>
                    <li>
                      <a href="">Press</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="footer-widget contact-widget">
                  <div className="con-info">
                    <span>Name</span>
                    <p>The NU Thrift Store</p>
                  </div>
                  <div className="con-info">
                    <span>Address</span>
                    <p>500 Boylston Street</p>
                  </div>
                  <div className="con-info">
                    <span>Call Us</span>
                    <p>+1 617 373 0000</p>
                  </div>
                  <div className="con-info">
                    <span>Email</span>
                    <p>shop@nuthriftstore.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="social-links-warp">
            <div className="container">
              <div className="social-links">
                <a href="" className="instagram">
                  <i className="fa fa-instagram"></i>
                  <span style={spanstyle}>instagram</span>
                </a>
                <a href="" className="google-plus">
                  <i className="fa fa-google-plus"></i>
                  <span style={spanstyle}>g+plus</span>
                </a>
                <a href="" className="pinterest">
                  <i className="fa fa-pinterest"></i>
                  <span style={spanstyle}>pinterest</span>
                </a>

                <a href="" className="twitter">
                  <i className="fa fa-twitter"></i>
                  <span style={spanstyle}>twitter</span>
                </a>
                <a href="" className="youtube">
                  <i className="fa fa-youtube"></i>
                  <span style={spanstyle}>youtube</span>
                </a>
                <a href="">
                  <i className="fa fa-tumblr-square"></i>
                  <span style={spanstyle}>tumblr</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

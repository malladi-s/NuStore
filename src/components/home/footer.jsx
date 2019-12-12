import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default class Footeru extends Component {
  render() {
    return (
      <div>
        <FontAwesomeIcon icon={faFacebook} size="3x" />
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
                    <span>instagram</span>
                  </a>
                  <a href="" className="google-plus">
                    <i className="fa fa-google-plus"></i>
                    <span>g+plus</span>
                  </a>
                  <a href="" className="pinterest">
                    <i className="fa fa-pinterest"></i>
                    <span>pinterest</span>
                  </a>
                  <a>
                    <FontAwesomeIcon icon={faFacebook} size="3x" />
                  </a>
                  <a href="" className="facebook">
                    <span>facebook</span>
                  </a>
                  <a href="" className="twitter">
                    <i className="fa fa-twitter"></i>
                    <span>twitter</span>
                  </a>
                  <a href="" className="youtube">
                    <i className="fa fa-youtube"></i>
                    <span>youtube</span>
                  </a>
                  <a href="" className="tumblr">
                    <i className="fa fa-tumblr-square"></i>
                    <span>tumblr</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

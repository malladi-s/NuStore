import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

export default class AutoCaro extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D1800%252C1100%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C978%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2019-07%252F379d58d0-aa5d-11e9-beff-7a3b25ef2046%26client%3Da1acac3e1b3290917d92%26signature%3D47abd0dfc739c90271f47358f8f52a55f9265602&client=amp-blogside-v2&signature=69987cd3a527c27862efdf14839b5490a0aba365"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.thewowstyle.com/wp-content/uploads/2019/01/Men’s-Fashion.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/35/6c/bf/356cbf4e8a59b2d5ce1d5bef241c40e2.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

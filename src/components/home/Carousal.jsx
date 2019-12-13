import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

const items = [
  {
    src:
      "https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D1800%252C1100%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C978%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2019-07%252F379d58d0-aa5d-11e9-beff-7a3b25ef2046%26client%3Da1acac3e1b3290917d92%26signature%3D47abd0dfc739c90271f47358f8f52a55f9265602&client=amp-blogside-v2&signature=69987cd3a527c27862efdf14839b5490a0aba365",
    altText: "Electronics",
    caption: "Starting at really low prices"
  },
  {
    src:
      "https://www.thewowstyle.com/wp-content/uploads/2019/01/Men’s-Fashion.png",
    altText: "Fashion Accessories ",
    caption: "Value for Money"
  },
  {
    src:
      "https://i.pinimg.com/originals/35/6c/bf/356cbf4e8a59b2d5ce1d5bef241c40e2.jpg",
    altText: "Furinture",
    caption: "Strong Furniture"
  }
];

const Example = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionHeader={item.caption}
          captionText={item.altText}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Example;

import React, { useState } from "react";

import { Carousel, Image } from "react-bootstrap";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
// !reference taken from react-bootstrap carousel docs
function ControlledCarousel({ index, photos }) {
  const [photoIndex, setPhotoIndex] = useState(index);

  const handleSelect = (index, e) => {
    setPhotoIndex(index);
  };

  const content =
    photos &&
    photos.map((photo) => {
      return (
        <Carousel.Item key={photo._id} className="carousel-photo-container">
          <Image className="photo" src={photo.url} alt={photo.description} />
          <Carousel.Caption className="caption">
            <p className="photo-desc">{photo.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

  return (
    <Carousel
      activeIndex={photoIndex}
      onSelect={handleSelect}
      interval={null}
      nextIcon={<FaArrowCircleRight className="chevron-icon" />}
      prevIcon={<FaArrowCircleLeft className="chevron-icon" />}
    >
      {content}
    </Carousel>
  );
}

export default ControlledCarousel;

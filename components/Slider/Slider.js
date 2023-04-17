import React from "react";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBox = ({ slides }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const renderSlides = slides.map((slide) => (
    <AspectRatio.Root ratio={16 / 9} key={slide.title}>
      <Image
        className="w-full"
        src={slide.url}
        alt={slide.title}
        width={slide.width}
        height={slide.height}
      />
    </AspectRatio.Root>
  ));

  return (
    <div>
      <Slider {...settings}>{renderSlides}</Slider>
    </div>
  );
};

export default SliderBox;

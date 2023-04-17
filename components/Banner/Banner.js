import React from "react";
import Image from "next/image";

const Banner = ({ src, alt }) => (
  <div className="w-full">
    <Image src={src} alt={alt} width="1600" height="800" priority />
  </div>
);

export default Banner;

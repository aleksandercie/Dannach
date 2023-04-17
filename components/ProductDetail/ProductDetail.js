import React from "react";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

const ProductDetail = ({ product }) => {
  const { name, price, size, description, color, image } = product;

  return (
    <div className="mx-4 mt-4 max-w-5xl">
      <AspectRatio.Root ratio={16 / 9}>
        <Image
          src={image.url}
          alt={image.title}
          className="image"
          width={image.width}
          height={image.height}
        />
      </AspectRatio.Root>
      <h1 className="text-2xl mb-6 uppercase font-semibold">{name}</h1>
      <h2 className="text-base mb-2 text-slate-400">{color}</h2>
      <h3 className="text-base mb-2 text-slate-400">{size}</h3>
      <h4 className="text-base mb-8 font-semibold">{price}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default ProductDetail;

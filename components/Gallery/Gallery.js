import React from "react";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

const Gallery = ({ products }) => (
  <div className="flex flex-wrap [&>*]:max-h-96">
    {products.map(({ image, name }) => (
      <div key={name} className="w-full md:w-1/2 group relative my-2 ">
        <div className="w-full overflow-hidden">
          <AspectRatio.Root ratio={16 / 9}>
            <Image
              src={image.url}
              alt={image.title}
              className="h-full w-full object-contain"
              width={image.width}
              height={image.height}
            />
          </AspectRatio.Root>
        </div>
        <div className="uppercase absolute text-sm opacity-0 group-hover:opacity-100 z-10 left-10 bottom-8 transition-all duration-200">
          {name}
        </div>
      </div>
    ))}
  </div>
);

export default Gallery;

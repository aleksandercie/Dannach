import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

const Products = ({ products }) => (
  <div className="flex flex-wrap [&>*]:max-h-96">
    {products.map(({ image, name }) => (
      <div key={name} className="w-full md:w-1/2 group relative mt-2 mb-10">
        <Link href={`collection/${name}`}>
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
            <div className="uppercase text-sm my-4 ml-6 font-semibold">
              {name}
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
);

export default Products;

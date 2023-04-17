import React from "react";
import Link from "next/link";

const Description = ({ button, info }) => (
  <div className="mt-20 mb-10 flex flex-col items-center max-w-sm mx-auto">
    <p className="text-xl text-center">{info}</p>
    <Link href="/about" className="text-lg mt-8 uppercase">
      {button}
    </Link>
  </div>
);

export default Description;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo-footer.svg";

const Footer = ({ footer }) => {
  const { links, copyrights } = footer;

  return (
    <footer className="flex flex-row mt-20">
      <div className="flex flex-col mx-4 w-full border-t border-slate-400">
        <div className="flex flex-col sm:flex-row flex-wrap w-full mt-4">
          {links.list.map((item) => (
            <div
              className="flex flex-col uppercase mb-4 w-1/3 max-lg:w-1/2"
              key={item.title}
            >
              <p className="text-sm">{item.title}</p>
              <div className="flex flex-col text-xs mt-2 text-slate-400">
                <Link href="/" className="mb-1">
                  {item.main}
                </Link>
                <Link href="/">{item.secondary}</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col my-8">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="w-8 mb-2"
          />
          <p>{copyrights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import Link from "next/link";
import Logo from "../Logo/Logo";

const Navbar = ({ navigation }) => {
  const { title, links } = navigation;

  const renderLinks = links.map((link) => (
    <li className="text-2xl" key={link}>
      <Link href={link === "home" ? "/" : `/${link}`}>{link}</Link>
    </li>
  ));

  return (
    <header className="w-full flex items-center justify-start sticky top-0 z-50">
      <div className="w-full relative">
        <div className="w-32">
          <div className="group relative hover:bg-white w-full transition-all duration-200">
            <div className="text-lg font-light pb-2 pt-1 uppercase">
              {title}
            </div>
            <ul className="opacity-0 group-hover:opacity-100 text-xl absolute bg-white w-full pb-2 invisible group-hover:visible transition-all duration-200">
              {renderLinks}
            </ul>
          </div>
        </div>
        <div className="w-28 absolute inset-x-1/2 top-8 -translate-y-full -translate-x-1/2">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

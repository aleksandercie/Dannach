import React from "react";

const ContactBox = ({ contact }) => {
  const { info, press, sales, phone } = contact;

  return (
    <div className="relative mt-52 mb-60">
      <div className="relative top-1/4">
        <p className="text-center text-xl">{sales}</p>
        <p className="text-center text-xl">{press}</p>
        <p className="text-center text-xl">{info}</p>
        <p className="text-center text-xl mt-8">{phone}</p>
      </div>
    </div>
  );
};

export default ContactBox;

import React from "react";
import { Link } from "react-router-dom";
// import { BsPhoneFill } from "react-icons/bs";
import logo from "../assets/images/samsung-logo-black.png";

export default function Navbar() {
  const menu = [
    { path: "phone", name: "Điện thoại" },
    { path: "television", name: "TV & AV" },
  ];

  return (
    <div className="menu">
      <div className="menu__header">
        <div className="menu__header--banner">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        {menu.map((item, index) => (
          <Link to={item.path} key={index} className="menu__header--item">
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

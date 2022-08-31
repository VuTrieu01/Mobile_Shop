import React from "react";
import { Link } from "react-router-dom";
import { BsPhoneFill } from "react-icons/bs";

export default function Navbar() {
  const menu = [
    { path: "phone", name: "Điện thoại" },
    { path: "television", name: "TV & AV" },
  ];
  return (
    <>
      <div className="navbar">
        <div>
          <Link to="/" className="home">
            <h3>Home-Logo</h3>
          </Link>
          {menu.map((item, index) => (
            <Link to={item.path} key={index} className="phone">
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

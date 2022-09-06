import React from "react";
import { Link } from "react-router-dom";
import { CgSearch, CgShoppingCart } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/logo-fpt-shop.png";

export default function Navbar() {
  const menu = [
    {
      path: "shoppingCart",
      name: "Giỏ hàng",
      icon: <CgShoppingCart size={25} />,
    },
    {
      path: "user",
      name: "Tài khoản của tôi",
      icon: <FaUserCircle size={25} />,
    },
  ];

  return (
    <div className="menu">
      <div className="menu__header">
        <div className="menu__header--logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="menu__header--search">
          <input
            type="text"
            placeholder="Nhập tên điện thoại, máy tính, phụ kiện... cần tìm"
          />
          <div className="menu__header--search--icon">
            <CgSearch color="white" size={30} />
          </div>
        </div>
        <div className="menu__header--link">
          {menu.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="menu__header--link--item"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

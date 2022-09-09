import React from "react";
import { Link } from "react-router-dom";
import {
  CgSearch,
  CgShoppingCart,
  CgSmartphone,
  CgLaptop,
} from "react-icons/cg";
import { FaUserCircle, FaApple } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";
import logo from "../assets/images/logo-fpt-shop.png";

export default function Navbar() {
  const menu1 = [
    {
      path: "shoppingCart",
      name: "Giỏ hàng",
      icon: <CgShoppingCart size={25} />,
    },
    {
      path: "signIn",
      name: "Tài khoản của tôi",
      icon: <FaUserCircle size={25} />,
    },
  ];
  const menu2 = [
    {
      path: "phone",
      name: "ĐIỆN THOẠI",
      icon: <CgSmartphone size={25} />,
    },
    {
      path: "laptop",
      name: "LAPTOP",
      icon: <CgLaptop size={25} />,
    },
    {
      path: "apple",
      name: "APPLE",
      icon: <FaApple size={25} />,
    },
    {
      path: "pc",
      name: "PC - LINH KIỆN",
      icon: <RiComputerFill size={25} />,
    },
    {
      path: "oldMachine",
      name: "MÁY CŨ GIÁ RẺ",
      icon: <AiOutlineReload size={25} />,
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
          {menu1.map((item, index) => (
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
      <div className="menu__header2">
        {menu2.map((item, index) => (
          <Link to={item.path} key={index} className="menu__header2--link">
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

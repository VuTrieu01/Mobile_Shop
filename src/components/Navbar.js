import React, { useState } from "react";
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
import SignIn from "../features/user/SignIn";

export default function Navbar() {
  const menu = [
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
  const [login, setLogin] = useState(false);
  const showLogin = () => setLogin(!login);

  return (
    <div className="menu">
      <SignIn login={login} showLogin={showLogin} />
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
          <div className="menu__header--link--item">
            <span>
              <CgShoppingCart size={25} />
            </span>
            <span>Giỏ hàng</span>
          </div>
          <div className="menu__header--link--item" onClick={showLogin}>
            <span>
              <FaUserCircle size={25} />
            </span>
            <span>Tài khoản của tôi</span>
          </div>
        </div>
      </div>
      <div className="menu__header2">
        {menu.map((item, index) => (
          <Link to={item.path} key={index} className="menu__header2--link">
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

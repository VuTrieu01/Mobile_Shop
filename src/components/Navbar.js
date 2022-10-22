import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgSearch, CgShoppingCart } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import logo from "../assets/images/logo.png";
import SignIn from "../features/user/SignIn";
import Dropdown from "./Dropdown";
import { useAuth } from "../features/user/AuthContext";
import { BsFillLaptopFill } from "react-icons/bs";
import { MdLibraryBooks } from "react-icons/md";
import { AiFillPhone, AiFillBell } from "react-icons/ai";
import { database } from "../firebase";
import { child, onValue, ref } from "firebase/database";

export default function Navbar() {
  const menu = [
    {
      path: "/",
      name: "TRANG CHỦ",
      icon: <AiFillHome size={25} />,
    },
    {
      path: "gioithieu",
      name: "GIỚI THIỆU",
      icon: <MdLibraryBooks size={25} />,
    },
    {
      path: "sanpham",
      name: "SẢN PHẨM",
      icon: <BsFillLaptopFill size={25} />,
    },
    {
      path: "tintuc",
      name: "TIN TỨC",
      icon: <AiFillBell size={25} />,
    },
    {
      path: "lienhe",
      name: "LIÊN HỆ",
      icon: <AiFillPhone size={25} />,
    },
  ];
  const [login, setLogin] = useState(false);
  const showLogin = () => setLogin(!login);
  const [dropdown, setDropdown] = useState(false);
  const showDropdown = () => setDropdown(!dropdown);

  const { currentUser } = useAuth();

  const [product, setProduct] = useState([]);

  const dbRef = ref(database);

  useEffect(() => {
    currentUser ? (
      onValue(child(dbRef, `/${currentUser.uid}` + `/cart`), (snapshot) => {
        setProduct([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((item) => {
            setProduct((oldArray) => [...oldArray, item]);
          });
        }
      })
    ) : (
      <></>
    );
  }, []);

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
          <Link to="shoppingCart" className="menu__header--link--item">
            <span>
              <CgShoppingCart size={25} />
            </span>
            {product.length === 0 ? (
              <span></span>
            ) : (
              <span className="menu__header--link--item--cart">
                {product.length}
              </span>
            )}

            <span>Giỏ hàng</span>
          </Link>
          {currentUser ? (
            <div
              className="menu__header--link--item"
              onMouseEnter={showDropdown}
              onMouseLeave={showDropdown}
            >
              <span>
                <FaUserCircle size={25} />
              </span>
              <span>{currentUser.email}</span>
              {dropdown && <Dropdown />}
            </div>
          ) : (
            <div className="menu__header--link--item" onClick={showLogin}>
              <span>
                <FaUserCircle size={25} />
              </span>
              <span>Đăng nhập</span>
            </div>
          )}
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

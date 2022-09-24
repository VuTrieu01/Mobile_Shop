import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/user/AuthContext";
import UpdatePassword from "../features/user/UpdatePassword";

export default function Dropdown() {
  const [dropdown, setDropdown] = useState(false);
  const showDropdown = () => setDropdown(!dropdown);

  const { logOut } = useAuth();
  const history = useNavigate();

  async function handleLogOut() {
    try {
      await logOut();
      history("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <ul
        className={dropdown ? "services__submenu clicked" : "services__submenu"}
        onClick={showDropdown}
      >
        <Link to="updateProfile" className="services__submenu--item">
          <li>Đổi mật khẩu</li>
        </Link>
        <li className="services__submenu--item" onClick={handleLogOut}>
          Đăng xuất
        </li>
      </ul>
    </>
  );
}

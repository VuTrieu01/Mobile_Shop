import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/user/AuthContext";

export default function Dropdown() {
  const [dropdown, setDropdown] = useState(false);
  const showDropdown = () => setDropdown(!dropdown);

  const { logOut, currentUser } = useAuth();
  const history = useNavigate();

  async function handleLogOut() {
    try {
      await logOut();
      history("/");
    } catch (e) {
      console.log(e);
      console.log(currentUser.email);
    }
  }
  return (
    <>
      <ul
        className={dropdown ? "services__submenu clicked" : "services__submenu"}
        onClick={showDropdown}
      >
        <li className="services__submenu--item">Đổi mật khẩu</li>
        <li className="services__submenu--item" onClick={handleLogOut}>
          Đăng xuất
        </li>
      </ul>
    </>
  );
}

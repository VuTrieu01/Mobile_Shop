import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/user/AuthContext";
import { useNavigate } from "react-router-dom";
import { child, onValue, ref } from "firebase/database";
import { database } from "../firebase";

export default function Dropdown() {
  const [dropdown, setDropdown] = useState(false);
  const showDropdown = () => setDropdown(!dropdown);

  const { logOut, currentUser } = useAuth();
  const history = useNavigate();
  const dbRef = ref(database);
  const [product, setProduct] = useState([]);

  async function handleLogOut() {
    try {
      await logOut();
      history("/");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    currentUser ? (
      onValue(child(dbRef, `Bill` + `/${currentUser.uid}`), (snapshot) => {
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
    <>
      <ul
        className={dropdown ? "services__submenu clicked" : "services__submenu"}
        onClick={showDropdown}
      >
        <div className="triangle-up"></div>
        <Link to="infoClient" className="services__submenu--item">
          <li>Thông tin cá nhân</li>
        </Link>
        <Link to="bill" className="services__submenu--item">
          {product.length === 0 ? (
            <li>Đơn hàng</li>
          ) : (
            <div className="services__submenu--item--length">
              <li>Đơn hàng</li>
              <span className="length">{product.length}</span>
            </div>
          )}
        </Link>
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

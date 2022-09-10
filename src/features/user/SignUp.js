import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Signup() {
  return (
    <div className="login">
      <div className="login__fields">
        <div className="login__fields--icon">
          <AiFillCloseCircle size={25} />
        </div>
        <div className="login__fields--item">
          <h1>Đăng nhập</h1>
          <input placeholder="Email" />
          <input type="password" placeholder="Mật khẩu" />
          <input type="password" placeholder="Nhập lại mật khẩu" />
          <button type="submit">Đăng kí</button>
          <div>Đã có tài khoản? Đăng nhâp</div>
        </div>
      </div>
    </div>
  );
}

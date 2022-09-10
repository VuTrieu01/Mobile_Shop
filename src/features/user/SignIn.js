import React from "react";
// import * as AiIcons from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

export default function SignIn({ login, showLogin }) {
  return (
    <>
      {login ? (
        <div className="login">
          <div className="login__fields">
            <div className="login__fields--icon">
              <AiFillCloseCircle size={25} onClick={showLogin} />
            </div>
            <div className="login__fields--item">
              <h1>Đăng nhập</h1>
              <div>Email</div>
              <input placeholder="Email" />
              <div>Mật khẩu</div>
              <input type="password" placeholder="Mật khẩu" />
              <button type="submit">Đăng nhập</button>
              <div>Chưa có tài khoản? Đăng ký</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

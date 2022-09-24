import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function UpdatePassword() {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Mật khẩu không khớp");
    }
    try {
      setError("");
      setLoading(true);
      await updatePassword(passwordRef.current.value);
      history("/");
    } catch (e) {
      setError("Tạo tài khoản thất bại");
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="login__fields">
        <form className="login__fields--item" onSubmit={handleSubmit}>
          <h1>Đăng ký</h1>
          {error === "" ? null : <h4>{error}</h4>}

          <p>
            <label>Mật khẩu</label>
            <input type="password" placeholder="Mật khẩu" ref={passwordRef} />
          </p>
          <p>
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              ref={passwordConfirmRef}
            />
          </p>
          <button type="submit" disabled={loading}>
            Đăng kí
          </button>
        </form>
      </div>
    </>
  );
}

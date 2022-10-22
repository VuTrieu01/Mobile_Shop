import React, { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuth } from "./AuthContext";

export default function Signup({ register, showRegister, setRegister }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Mật khẩu không khớp");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      window.location.reload();
      exitRegister();
    } catch (e) {
      setError("Tạo tài khoản thất bại");
      console.log(e);
    }
    setLoading(false);
  }

  const exitRegister = () => setRegister(!register);

  return (
    <>
      {register ? (
        <div className="login">
          <div className="login__fields">
            <AiFillCloseCircle
              size={25}
              className="login__fields--icon"
              onClick={exitRegister}
            />
            <form className="login__fields--item" onSubmit={handleSubmit}>
              <h1>Đăng ký</h1>
              {error === "" ? null : <h4>{error}</h4>}
              <p>
                <label>Email</label>
                <input placeholder="Email" ref={emailRef} name="email" />
              </p>
              <p>
                <label>Mật khẩu</label>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  ref={passwordRef}
                />
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
              <span onClick={showRegister}>Đã có tài khoản? Đăng nhâp</span>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

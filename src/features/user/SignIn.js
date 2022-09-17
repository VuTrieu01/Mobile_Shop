import React, { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Signup from "./SignUp";

export default function SignIn({ login, showLogin }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [register, setRegister] = useState(false);
  const showRegister = () => {
    setRegister(!register);
    showLogin();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      setError("Tạo tài khoản thất bại");
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <>
      {login ? (
        <div className="login">
          <div className="login__fields">
            <AiFillCloseCircle
              size={25}
              className="login__fields--icon"
              onClick={showLogin}
            />
            <form className="login__fields--item" onSubmit={handleSubmit}>
              <h1>Đăng nhập</h1>
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
              <button type="submit" disabled={loading}>
                Đăng nhập
              </button>
              <span onClick={showRegister}>Chưa có tài khoản? Đăng ký</span>
            </form>
          </div>
        </div>
      ) : null}
      <Signup
        register={register}
        showRegister={showRegister}
        showLogin={showLogin}
      />
    </>
  );
}

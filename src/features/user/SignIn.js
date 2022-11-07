import React, { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuth } from "./AuthContext";
import Signup from "./SignUp";

export default function SignIn({ login, showLogin }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    if (!isValidEmail(event.target.value)) {
      if (email.length >= 1) {
        setErrorEmail("Email không hợp lệ!!!");
      } else {
        setErrorEmail(null);
      }
    } else {
      setErrorEmail(null);
    }
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    if (
      // password.match(/[A-Z]/) == null &&
      // password.match(/[0-9]/) == null &&
      // password.match(/[!@#$%^&*]/) == null &&
      password.length >= 1 &&
      password.length < 6
    ) {
      setErrorPassword("Bạn phải nhập tối thiểu 6 kí tự cho mật khẩu!!!");
    } else {
      setErrorPassword(null);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (emailRef.current.value !== "" && passwordRef.current.value !== "") {
      try {
        setError("");
        setLoading(true);
        await signIn(emailRef.current.value, passwordRef.current.value);
        window.location.reload();
        showLogin();
      } catch (e) {
        setError("Đăng nhập không thành công!!!");
        console.log(e);
      }
      setLoading(false);
    } else {
      setError("Vui lòng nhập đầy đủ thông tin!!!");
    }
  }

  const showRegister = () => {
    setRegister(!register);
    showLogin();
    setError("");
    setErrorEmail(null);
    setErrorPassword(null);
  };

  const handleChangeShowLogin = () => {
    showLogin();
    setError("");
    setErrorEmail(null);
    setErrorPassword(null);
  };

  return (
    <>
      {login ? (
        <div className="login">
          <div className="login__fields">
            <AiFillCloseCircle
              size={25}
              className="login__fields--icon"
              onClick={handleChangeShowLogin}
            />
            <form className="login__fields--item" onSubmit={handleSubmit}>
              <h1>Đăng nhập</h1>
              {error === "" ? null : <h4>{error}</h4>}
              <div className="form-input">
                <label>Email</label>
                <input
                  placeholder="Email"
                  ref={emailRef}
                  name="email"
                  onChange={handleChangeEmail}
                />
                {errorEmail === "" ? null : <h6>{errorEmail}</h6>}
              </div>

              <div className="form-input">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  ref={passwordRef}
                  onChange={handleChangePassword}
                />
                {errorPassword === "" ? null : <h6>{errorPassword}</h6>}
              </div>
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
        setRegister={setRegister}
      />
    </>
  );
}

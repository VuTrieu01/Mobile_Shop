import React, { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuth } from "./AuthContext";
import Signup from "./SignUp";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function SignIn({ login, showLogin }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [register, setRegister] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [error2, setError2] = useState(null);
  const [messagePassword, setMessagePassword] = useState("");
  const [error3, setError3] = useState(null);

  const [show, setShow] = useState(false);

  const handleShowhide = () => {
    setShow(!show);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeEmail = (event) => {
    const length = event.target.value;
    console.log(length);
    if (!isValidEmail(event.target.value)) {
      setError2("Email không hợp lệ");
    } else {
      setError2(null);
    }

    setMessageEmail(event.target.value);
  };

  const handleChangePassword = (e) => {
    const password = e.target.value;
    if (
      // password.match(/[A-Z]/) == null &&
      // password.match(/[0-9]/) == null &&
      // password.match(/[!@#$%^&*]/) == null &&
      password.length < 6
    ) {
      setError3("Bạn phải nhập tối thiểu 6 kí tự cho mật khẩu");
    } else {
      setError3(null);
    }
    setMessagePassword(e.target.value);
  };

  const showRegister = () => {
    setRegister(!register);
    showLogin();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      window.location.reload();
      showLogin();
    } catch (e) {
      setError("Đăng nhập không thành công");
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
              <div className="form-input">
                <label>Email</label>
                <input
                  placeholder="Email"
                  ref={emailRef}
                  name="email"
                  value={messageEmail}
                  onChange={handleChangeEmail}
                />

                {error2 ? <h6>{error2}</h6> : <></>}
              </div>

              <div className="form-input">
                <label>Mật khẩu</label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Mật khẩu"
                  ref={passwordRef}
                  value={messagePassword}
                  onChange={handleChangePassword}
                />
                {show ? (
                  <i className="form-input--icon" onClick={handleShowhide}>
                    <AiFillEye size={25} />
                  </i>
                ) : (
                  <i className="form-input--icon" onClick={handleShowhide}>
                    <AiFillEyeInvisible size={25} />
                  </i>
                )}
                {error3 === "" ? null : <h6>{error3}</h6>}
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

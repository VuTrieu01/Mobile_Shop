import React, { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuth } from "./AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Signup({ register, showRegister, setRegister }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [error2, setError2] = useState(null);
  const [messagePassword, setMessagePassword] = useState("");
  const [messagePasswordConfirm, setMessagePasswordConfirm] = useState("");
  const [error3, setError3] = useState(null);
  const [error4, setError4] = useState(null);
  const [show, setShow] = useState(false);

  const handleShowhide = () => {
    setShow(!show);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeEmail = (event) => {
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

  const handleChangePasswordConfirm = (e) => {
    const password = e.target.value;
    if (
      // password.match(/[A-Z]/) == null &&
      // password.match(/[0-9]/) == null &&
      // password.match(/[!@#$%^&*]/) == null &&
      password.length < 6
    ) {
      setError4("Bạn phải nhập tối thiểu 6 kí tự cho mật khẩu");
    } else {
      setError4(null);
    }
    setMessagePasswordConfirm(e.target.value);
  };

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
              <div className="form-input">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email..."
                  ref={emailRef}
                  name="email"
                  value={messageEmail}
                  onChange={handleChangeEmail}
                />
                {error2 === "" ? null : <h6>{error2}</h6>}
              </div>

              <div className="form-input">
                <label>Mật khẩu</label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Mật khẩu..."
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
              <div className="form-input">
                <label>Nhập lại mật khẩu</label>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu..."
                  ref={passwordConfirmRef}
                  value={messagePasswordConfirm}
                  onChange={handleChangePasswordConfirm}
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
                {error4 === "" ? null : <h6>{error4}</h6>}
              </div>
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

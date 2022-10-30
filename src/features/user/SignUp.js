import React, { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuth } from "./AuthContext";
import { child, onValue, ref, set } from "firebase/database";
import { database } from "../../firebase";
import { uid } from "uid";

export default function Signup({ register, showRegister, setRegister }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(null);
  const dbRef = ref(database);
  const [listEmail, setListEmail] = useState([]);
  const uuid = uid();

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

  const handleChangePasswordConfirm = (e) => {
    const passwordConfirm = e.target.value;
    if (
      // password.match(/[A-Z]/) == null &&
      // password.match(/[0-9]/) == null &&
      // password.match(/[!@#$%^&*]/) == null &&
      passwordConfirm.length >= 1 &&
      passwordConfirm.length < 6
    ) {
      setErrorPasswordConfirm(
        "Bạn phải nhập tối thiểu 6 kí tự cho mật khẩu!!!"
      );
    } else {
      setErrorPasswordConfirm(null);
    }
  };

  useEffect(() => {
    onValue(child(dbRef, `Email`), (snapshot) => {
      setListEmail([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          setListEmail((oldArray) => [...oldArray, item]);
        });
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      emailRef.current.value !== "" &&
      passwordRef.current.value !== "" &&
      passwordConfirmRef.current.value !== "" &&
      nameRef.current.value !== "" &&
      phoneRef.current.value !== "" &&
      addressRef.current.value !== ""
    ) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Mật khẩu không khớp!!!");
      }

      if (
        listEmail
          .map((item) => item.email)
          .find((a) => a === emailRef.current.value) !== undefined
      ) {
        setError("Email đã tồn tại!!!");
      } else {
        try {
          setError("");
          setLoading(true);

          set(ref(database, `Email` + `/${uuid}`), {
            email: emailRef.current.value,
          })
            .then(() => {
              console.log("Success");
            })
            .catch((error) => {
              console.log(error);
            });

          await signup(emailRef.current.value, passwordRef.current.value);
          window.location.reload();
          exitRegister();
        } catch (e) {
          setError("Tạo tài khoản thất bại");
          console.log(e);
        }
        setLoading(false);
      }
    } else {
      setError("Vui lòng nhập đầy đủ thông tin!!!");
    }
  }

  const exitRegister = () => {
    setRegister(!register);
    setError("");
  };

  const handleChangeShowRegister = () => {
    showRegister();
    setError("");
  };

  return (
    <>
      {register ? (
        <div className="logout">
          <div className="logout__fields">
            <AiFillCloseCircle
              size={25}
              className="logout__fields--icon"
              onClick={exitRegister}
            />
            <form onSubmit={handleSubmit}>
              <h1>Đăng ký</h1>
              {error === "" ? null : <h4>{error}</h4>}

              <div className="logout__fields--item">
                <div className="logout__fields--item--account">
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
                      placeholder="Mật khẩu"
                      type="password"
                      ref={passwordRef}
                      onChange={handleChangePassword}
                    />
                    {errorPassword === "" ? null : <h6>{errorPassword}</h6>}
                  </div>

                  <div className="form-input">
                    <label>Nhập lại mật khẩu</label>
                    <input
                      placeholder="Nhập lại mật khẩu"
                      type="password"
                      ref={passwordConfirmRef}
                      onChange={handleChangePasswordConfirm}
                    />
                    {errorPasswordConfirm === "" ? null : (
                      <h6>{errorPasswordConfirm}</h6>
                    )}
                  </div>
                </div>

                <div className="logout__fields--item--client">
                  <div className="form-input">
                    <label>Họ và tên</label>
                    <input type="text" placeholder="Họ và tên" ref={nameRef} />
                  </div>

                  <div className="form-input">
                    <label>Số điện thoại</label>
                    <input
                      type="number"
                      placeholder="Số điện thoại"
                      ref={phoneRef}
                    />
                  </div>

                  <div className="form-input">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Địa chỉ nhận hàng"
                      ref={addressRef}
                    />
                  </div>
                </div>
              </div>

              <div className="logout__fields--button">
                <button type="submit" disabled={loading}>
                  Đăng kí
                </button>
                <span onClick={handleChangeShowRegister}>
                  Đã có tài khoản? Đăng nhâp
                </span>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

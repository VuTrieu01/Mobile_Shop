import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function UpdatePassword() {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { upPassword, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Mật khẩu không khớp");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (passwordRef.current.value) {
      promises.push(upPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history("/");
      })
      .catch((e) => {
        console.log(e);
        setError("Cập nhật mật khẩu thất bại");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className="updatePass">
        <div className="updatePass__fields">
          <form className="updatePass__fields--item" onSubmit={handleSubmit}>
            <h1>Cập nhật mật khẩu</h1>
            {error === "" ? null : <h4>{error}</h4>}
            <h3>
              <label>Email</label>
              <input value={currentUser.email} disabled="false" />
            </h3>

            <h3>
              <label>Nhập mật khẩu mới</label>
              <input type="password" placeholder="Mật khẩu" ref={passwordRef} />
            </h3>
            <h3>
              <label>Nhập lại mật khẩu mới</label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                ref={passwordConfirmRef}
              />
            </h3>
            <button type="submit" disabled={loading}>
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

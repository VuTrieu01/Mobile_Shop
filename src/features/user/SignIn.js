import React from "react";

export default function SignIn() {
  return (
    <div className="login">
      <div className="login__fields">
        <h3>Login</h3>
        <input placeholder="Email" />
        <input type="password" placeholder="Password" />
      </div>
    </div>
  );
}

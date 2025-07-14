import React, { useState } from "react";

function Login({ onLoginSuccess, onSignupClick }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(data.message);
      onLoginSuccess();
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br /><br />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{" "}
        <button onClick={onSignupClick}>Sign up</button>
      </p>
    </div>
  );
}

export default Login;


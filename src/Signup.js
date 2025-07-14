import React, { useState } from "react";

function Signup({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.message) {
      alert("Signup successful! Please login.");
      onSignupSuccess(); // Go back to login page
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} /><br /><br />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br /><br />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br /><br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;


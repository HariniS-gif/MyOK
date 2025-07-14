import React, { useState } from "react";

function OKRForm() {
  const [formData, setFormData] = useState({
    objective: "",
    keyResult: "",
    assignedTo: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/create-okr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Create OKR</h2>
      <input
        name="objective"
        placeholder="Objective"
        value={formData.objective}
        onChange={handleChange}
      /><br /><br />
      <input
        name="keyResult"
        placeholder="Key Result"
        value={formData.keyResult}
        onChange={handleChange}
      /><br /><br />
      <input
        name="assignedTo"
        placeholder="Assigned To (user email)"
        value={formData.assignedTo}
        onChange={handleChange}
      /><br /><br />
      <button onClick={handleSubmit}>Create OKR</button>
    </div>
  );
}

export default OKRForm;

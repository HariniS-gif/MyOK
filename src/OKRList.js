import React, { useEffect, useState } from "react";

function OKRList() {
  const [okrs, setOkrs] = useState([]);
  const [editingOKR, setEditingOKR] = useState(null);
  const [editForm, setEditForm] = useState({
    objective: "",
    keyResult: "",
    assignedTo: ""
  });

  // Fetch OKRs
  useEffect(() => {
    fetch("http://localhost:5000/get-okrs")
      .then((res) => res.json())
      .then((data) => setOkrs(data));
  }, []);

  // Start editing
  const handleEditClick = (okr) => {
    setEditingOKR(okr._id);
    setEditForm({
      objective: okr.objective,
      keyResult: okr.keyResult,
      assignedTo: okr.assignedTo
    });
  };

  // Submit updated OKR
  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/update-okr/${editingOKR}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editForm)
    });

    const data = await res.json();
    alert(data.message);

    // Refresh OKRs
    fetch("http://localhost:5000/get-okrs")
      .then((res) => res.json())
      .then((data) => {
        setOkrs(data);
        setEditingOKR(null);
      });
  };
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this OKR?")) {
    const res = await fetch(`http://localhost:5000/delete-okr/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message); // Show alert after deletion

    // Fetch updated OKRs again
    fetch("http://localhost:5000/get-okrs")
      .then((res) => res.json())
      .then((data) => setOkrs(data));
  }
};
const handleProgressChange = async (id, value) => {
  await fetch(`http://localhost:5000/update-progress/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ progress: value }),
  });

  // Refresh OKRs
  fetch("http://localhost:5000/get-okrs")
    .then((res) => res.json())
    .then((data) => setOkrs(data));
};

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", textAlign: "left" }}>
      <h2>📋 All OKRs</h2>
      {okrs.length === 0 ? (
        <p>No OKRs found.</p>
      ) : (
        <ul>
          {okrs.map((okr) => (
            <li key={okr._id} style={{ marginBottom: "10px" }}>
              {editingOKR === okr._id ? (
                <div>
                  <input
                    value={editForm.objective}
                    onChange={(e) =>
                      setEditForm({ ...editForm, objective: e.target.value })
                    }
                    placeholder="Objective"
                  />
                  <input
                    value={editForm.keyResult}
                    onChange={(e) =>
                      setEditForm({ ...editForm, keyResult: e.target.value })
                    }
                    placeholder="Key Result"
                  />
                  <input
                    value={editForm.assignedTo}
                    onChange={(e) =>
                      setEditForm({ ...editForm, assignedTo: e.target.value })
                    }
                    placeholder="Assigned To"
                  />
                  <button onClick={handleUpdate}>✅ Update</button>
                </div>
              ) : (
                <div>
                  <strong>🎯 Objective:</strong> {okr.objective} <br />
                  <strong>📌 Key Result:</strong> {okr.keyResult} <br />
                  <strong>👤 Assigned To:</strong> {okr.assignedTo}
                  <br />
                  <br />
<strong>📊 Progress:</strong> {okr.progress}% <br />
<input
  type="range"
  min="0"
  max="100"
  value={okr.progress}
  onChange={(e) => handleProgressChange(okr._id, e.target.value)}
/>

                  <button onClick={() => handleEditClick(okr)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(okr._id)} style={{ marginLeft: "10px" }}>🗑️ Delete</button>
                </div>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OKRList;


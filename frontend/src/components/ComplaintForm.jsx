import React, { useState } from "react";
import axios from "axios"; // Import library Axios untuk melakukan HTTP request

function ComplaintForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Kirim data pengaduan ke API backend
      await axios.post("http://localhost:5000/api/complaints", {
        name,
        email,
        complaint,
      });

      // Atur pesan berhasil
      setMessage("Pengaduan berhasil dikirim!");

      // Reset nilai input
      setName("");
      setEmail("");
      setComplaint("");
    } catch (error) {
      // Tangani kesalahan
      console.error("Gagal mengirim pengaduan:", error.message);
      setMessage("Gagal mengirim pengaduan");
    }
  };

  return (
    <div>
      <h2>Form Pengaduan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Keluhan:</label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Kirim Pengaduan</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ComplaintForm;

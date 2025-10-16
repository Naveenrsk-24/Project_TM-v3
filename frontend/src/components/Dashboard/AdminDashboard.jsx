"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}photos/`);
      const data = await res.json();
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(`${API_URL}photos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to add photo");

      const newPhoto = await res.json();
      setPhotos((prev) => [...prev, newPhoto]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        📸 TM Photography Admin Dashboard
      </h1>

      <form
        onSubmit={handleAddPhoto}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", flex: 1 }}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "8px", flex: 2 }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : photos.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#f9fafb",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e5e7eb" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {photos.map((photo) => (
              <tr key={photo.id}>
                <td style={tdStyle}>{photo.id}</td>
                <td style={tdStyle}>{photo.title}</td>
                <td style={tdStyle}>{photo.description}</td>
                <td style={tdStyle}>
                  {new Date(photo.uploaded_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "2px solid #d1d5db",
  textAlign: "left",
  color: "black",
};

const tdStyle = {
  padding: "8px",
  borderBottom: "1px solid #e5e7eb",
  color: "black",
};

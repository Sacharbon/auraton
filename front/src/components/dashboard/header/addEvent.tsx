import React, { useState } from "react";

const EventModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    label: "",
  });

  const labels = ["Sport", "Sortie", "Réunion", "Anniversaire", "Autre"];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Nouvel événement créé :", eventData);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Créer un nouvel événement</h2>
      <form onSubmit={handleSubmit}>
        {/* Titre de l'événement */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">Titre de l'événement :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Entrez un titre"
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Entrez une description"
            required
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Date */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Label */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="label">Label :</label>
          <select
            id="label"
            name="label"
            value={eventData.label}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Choisir un label</option>
            {labels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Boutons */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            style={{
              marginRight: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#ccc",
              border: "none",
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventModal;

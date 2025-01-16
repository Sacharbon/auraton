import React, { useState, useRef } from "react";

const EventModal = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    label: "",
    image: null as string | null,
  });

  const labels = ["Sport", "Sortie", "Réunion", "Anniversaire", "Autre"];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith("image/")) {
      setEventData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    } else {
      alert("Veuillez télécharger une image valide.");
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouvel événement créé :", eventData);
  };

  return (
    <div className="flex flex-col h-full p-1 justify-between">
      <h1 className="text-2xl font-semibold mb-6 flex justify-center w-full">
        Créer un nouvel événement
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full h-[93%] flex flex-col justify-between"
      >
        <div
          onClick={handleImageClick}
          className="w-full h-1/2 bg-gray-200 rounded-lg cursor-pointer relative overflow-hidden"
        >
          {eventData.image ? (
            <img
              src={eventData.image}
              alt="Aperçu de l'événement"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              Cliquez pour ajouter une image
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Cache l'input
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-md font-semibold text-gray-700"
          >
            Titre de l'événement :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Entrez un titre"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-md text-gray-700 font-semibold"
          >
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Entrez une description"
            required
            rows={4}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div className="flex flex-row justify-between w-full gap-4 h-20">
          <div className="w-full h-fit">
            <label
              htmlFor="date"
              className="block text-md font-semibold text-gray-700"
            >
              Date :
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md px-2 py-1 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="w-full h-fit">
            <label
              htmlFor="label"
              className="block text-md text-gray-700 font-semibold"
            >
              Tag :
            </label>
            <select
              id="tag"
              name="tag"
              value={eventData.label}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md bg-gray-100 p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Choisir un tag</option>
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => console.log("Annulé")}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventModal;

import { useState } from "react";

export default function ChantierForm({ onAdd }) {
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !ville) return;

  const apiUrl =
    import.meta.env.VITE_API_URL || window.location.origin.replace("3000", "5000");

  const res = await fetch(`${apiUrl}/api/chantiers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, ville }),
  });

    if (res.ok) {
      const data = await res.json();
      onAdd(data);
      setNom("");
      setVille("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 mb-6"
    >
      <h2 className="text-xl font-bold mb-4">➕ Ajouter un chantier</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Nom du chantier"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="border rounded-lg px-3 py-2 w-1/2"
        />
        <input
          type="text"
          placeholder="Ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          className="border rounded-lg px-3 py-2 w-1/2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}

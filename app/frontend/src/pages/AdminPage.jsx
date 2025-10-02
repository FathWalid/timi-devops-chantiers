import React, { useEffect, useState } from "react";

export default function AdminPage({ onLogout }) {
  const [chantiers, setChantiers] = useState([]);
  const [nom, setNom] = useState("");
  const [ville, setVille] = useState("");
  const [editing, setEditing] = useState(null);

  const token = localStorage.getItem("token");

  // Charger les chantiers
  const fetchChantiers = () => {
    fetch(import.meta.env.VITE_API_URL + "/api/chantiers")
      .then((res) => res.json())
      .then(setChantiers);
  };

  useEffect(() => {
    fetchChantiers();
  }, []);

  // Ajouter chantier
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nom || !ville) return;

    await fetch(import.meta.env.VITE_API_URL + "/api/chantiers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nom, ville }),
    });

    setNom("");
    setVille("");
    fetchChantiers();
  };

  // Supprimer chantier
  const handleDelete = async (id) => {
    await fetch(import.meta.env.VITE_API_URL + "/api/chantiers/" + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchChantiers();
  };

  // Activer le mode édition
  const handleEdit = (chantier) => {
    setEditing(chantier.id);
    setNom(chantier.nom);
    setVille(chantier.ville);
  };

  // Mettre à jour chantier
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(import.meta.env.VITE_API_URL + "/api/chantiers/" + editing, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nom, ville }),
    });
    setEditing(null);
    setNom("");
    setVille("");
    fetchChantiers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-dark">⚙️ Tableau de bord — Chantiers</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            🚪 Déconnexion
          </button>
        </div>

        {/* Formulaire */}
        <form
          onSubmit={editing ? handleUpdate : handleAdd}
          className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Nom du chantier"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-brand-gold outline-none"
            required
          />
          <input
            type="text"
            placeholder="Ville"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-brand-gold outline-none"
            required
          />
          <button
            type="submit"
            className="bg-brand-gold text-black px-5 py-3 rounded-lg font-semibold shadow hover:brightness-95 transition"
          >
            {editing ? "💾 Mettre à jour" : "➕ Ajouter"}
          </button>
        </form>

        {/* Liste des chantiers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chantiers.map((chantier) => (
            <div
              key={chantier.id}
              className="bg-white rounded-2xl shadow-md border border-black/5 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-brand-dark">{chantier.nom}</h3>
                <p className="text-sm text-brand-dark/70">{chantier.ville}</p>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(chantier)}
                  className="px-3 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDelete(chantier.id)}
                  className="px-3 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                >
                  🗑 Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

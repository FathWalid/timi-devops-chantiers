// frontend/src/components/Chantiers.jsx
import { useEffect, useState } from "react";

export default function Chantiers() {
  const [chantiers, setChantiers] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/chantiers")
      .then((res) => res.json())
      .then(setChantiers)
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-brand-dark">
          🚧 Nos chantiers en cours
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {chantiers.map((chantier) => (
            <div
              key={chantier.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-black/5 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-brand-dark">
                {chantier.nom}
              </h3>
              <p className="text-gray-600">{chantier.ville}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

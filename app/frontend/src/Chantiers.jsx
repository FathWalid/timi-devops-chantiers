import React, { useEffect, useState } from "react";

export default function Chantiers() {
  const [chantiers, setChantiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/chantiers")
      .then((res) => res.json())
      .then((data) => {
        setChantiers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-app">Chargement des chantiers...</div>
      </section>
    );
  }

  return (
    <section id="chantiers" className="py-16 bg-white">
      <div className="container-app">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
          Nos chantiers en cours
        </h2>
        <p className="text-brand-dark/70 mt-2 max-w-2xl">
          Voici la liste des chantiers suivis par notre équipe.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chantiers.map((chantier) => (
            <article
              key={chantier.id}
              className="bg-white rounded-2xl shadow-soft p-6 border border-black/5"
            >
              <h3 className="font-semibold text-brand-dark">{chantier.nom}</h3>
              <p className="text-sm text-brand-dark/70">{chantier.ville}</p>
              <p className="text-xs text-brand-dark/50 mt-2">
                Créé le : {new Date(chantier.created_at).toLocaleDateString()}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

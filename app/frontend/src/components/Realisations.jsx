import React from "react";

function RealisationsCard({ title, image }) {
  return (
    <article className="bg-white rounded-2xl shadow-soft overflow-hidden border border-black/5">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-brand-dark">{title}</h3>
        <p className="text-sm text-brand-dark/70 mt-1">
          Projet livré avec qualité et respect des délais.
        </p>
      </div>
    </article>
  );
}

export default function Realisations() {
  return (
    <section id="realisations" className="py-16 bg-white">
      <div className="container-app">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">Nos réalisations</h2>
        <p className="text-brand-dark/70 mt-2 max-w-2xl">
          Quelques exemples de projets menés avec succès par TIMI Contractors.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RealisationsCard title="Résidence Atlas" image="https://picsum.photos/400/300?random=1" />
          <RealisationsCard title="Immeuble Ifriqya" image="https://picsum.photos/400/300?random=2" />
          <RealisationsCard title="Villa Haut Standing" image="https://picsum.photos/400/300?random=3" />
        </div>
      </div>
    </section>
  );
}

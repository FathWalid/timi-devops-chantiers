import React from "react";

function ServiceCard({ title }) {
  return (
    <article className="bg-white rounded-2xl shadow-soft p-6 border border-black/5">
      <div className="h-12 w-12 rounded-lg bg-brand-gold/20 flex items-center justify-center mb-4">
        <span className="text-xl">🏗️</span>
      </div>
      <h3 className="font-semibold text-brand-dark">{title}</h3>
      <p className="mt-2 text-brand-dark/70 text-sm">
        Approche moderne, respect des normes et excellence opérationnelle.
      </p>
      <a href="#contact" className="mt-4 inline-flex text-brand-mid hover:text-brand-dark font-medium">
        En savoir plus →
      </a>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-16 bg-brand-light">
      <div className="container-app">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">Nos principaux services</h2>
        <p className="text-brand-dark/70 mt-2 max-w-2xl">
          De la conception à la remise des clés, nous pilotons vos projets avec rigueur.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard title="Conception & Construction" />
          <ServiceCard title="Rénovation de Bâtiments" />
          <ServiceCard title="Gestion de Projet" />
        </div>
      </div>
    </section>
  );
}

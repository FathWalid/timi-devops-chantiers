import React from "react";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 bg-gradient-to-b from-brand-dark to-brand-mid text-white">
      <div className="container-app relative">
        <p className="uppercase tracking-widest text-brand-gold font-semibold mb-3">
          Nous réalisons vos rêves
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl">
          Construisons Ensemble.
        </h1>
        <p className="mt-4 text-white/80 max-w-2xl">
          Sécurité, qualité et respect des délais : notre promesse sur chaque chantier.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-brand-gold px-5 py-3 font-semibold text-black hover:brightness-95 shadow-soft"
          >
            Demander un devis
          </a>
          <a
            href="#realisations"
            className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-semibold hover:bg-white/10"
          >
            Voir nos réalisations
          </a>
        </div>
      </div>
    </section>
  );
}

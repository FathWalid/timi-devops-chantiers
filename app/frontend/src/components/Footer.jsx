import React from "react";

export default function Footer() {
  return (
    <footer className="py-10 bg-brand-dark text-white" id="contact">
      <div className="container-app grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-brand-gold"></div>
            <span className="font-semibold">TIMI Contractors</span>
          </div>
          <p className="mt-3 text-white/70 text-sm">
            Avenue Allal Ben Abdellah N°5 Hay Nahda, Témara — +212 666 666 536
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-white/80">
            <li><a href="#" className="hover:text-white">Accueil</a></li>
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#realisations" className="hover:text-white">Réalisations</a></li>
            <li><a href="#references" className="hover:text-white">Références</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <form className="grid gap-3">
            <input
              type="text"
              placeholder="Nom"
              className="rounded-lg bg-white/10 border-white/20 placeholder-white/50"
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg bg-white/10 border-white/20 placeholder-white/50"
            />
            <textarea
              placeholder="Votre message"
              rows="3"
              className="rounded-lg bg-white/10 border-white/20 placeholder-white/50"
            ></textarea>
            <button className="rounded-lg bg-brand-gold text-black font-semibold py-2 hover:brightness-95">
              Envoyer
            </button>
          </form>
        </div>
      </div>
      <div className="container-app mt-8 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} TIMI Contractors — Démo
      </div>
    </footer>
  );
}

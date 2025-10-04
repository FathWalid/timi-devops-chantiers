import React, { useState } from "react";

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l’envoi du message");
      }

      const data = await res.json();
      if (data.success) {
        setStatus({ loading: false, success: "✅ Message envoyé avec succès !", error: null });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("Erreur lors de l’envoi de l’email");
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <footer className="py-10 bg-brand-dark text-white" id="contact">
      <div className="container-app grid md:grid-cols-3 gap-8">
        {/* === Bloc 1 : Logo & Adresse === */}
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-brand-gold"></div>
            <span className="font-semibold text-lg">TIMI Contractors</span>
          </div>
          <p className="mt-3 text-white/70 text-sm leading-relaxed">
            Avenue Allal Ben Abdellah N°5 Hay Nahda, Témara<br />
            📞 +212 666 666 536<br />
            ✉️ contact@timi.ma
          </p>
        </div>

        {/* === Bloc 2 : Navigation === */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Navigation</h4>
          <ul className="space-y-2 text-white/80">
            <li><a href="#" className="hover:text-white transition">Accueil</a></li>
            <li><a href="#services" className="hover:text-white transition">Services</a></li>
            <li><a href="#realisations" className="hover:text-white transition">Réalisations</a></li>
            <li><a href="#references" className="hover:text-white transition">Références</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* === Bloc 3 : Formulaire de contact === */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Contact</h4>
          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nom"
              className="rounded-lg bg-white/10 border border-white/20 placeholder-white/50 p-2 focus:ring-2 focus:ring-brand-gold outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="rounded-lg bg-white/10 border border-white/20 placeholder-white/50 p-2 focus:ring-2 focus:ring-brand-gold outline-none"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Votre message"
              rows="3"
              className="rounded-lg bg-white/10 border border-white/20 placeholder-white/50 p-2 focus:ring-2 focus:ring-brand-gold outline-none"
              required
            ></textarea>

            <button
              type="submit"
              disabled={status.loading}
              className="rounded-lg bg-brand-gold text-black font-semibold py-2 hover:brightness-95 transition disabled:opacity-70"
            >
              {status.loading ? "⏳ Envoi en cours..." : "📨 Envoyer"}
            </button>

            {status.success && (
              <p className="text-green-400 text-sm mt-2">{status.success}</p>
            )}
            {status.error && (
              <p className="text-red-400 text-sm mt-2">{status.error}</p>
            )}
          </form>
        </div>
      </div>

      <div className="container-app mt-8 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} TIMI Contractors — Tous droits réservés
      </div>
    </footer>
  );
}

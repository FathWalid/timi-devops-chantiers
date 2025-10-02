import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(import.meta.env.VITE_API_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }), // ✅ pas besoin d'Authorization ici
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token); // ✅ stocker JWT
      localStorage.setItem("isAdmin", "true");   // ✅ flag admin
      onLogin();
      window.location.href = "/admin"; // ✅ redirection vers AdminPage
    } else {
      alert("❌ Identifiants invalides !");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Connexion Admin</h2>

        <input
          type="text"
          placeholder="Utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-brand-gold text-black font-semibold py-3 rounded-lg hover:brightness-95 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

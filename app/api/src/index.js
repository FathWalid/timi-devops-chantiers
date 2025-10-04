import express from "express";
import pkg from "pg";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { resolve } from "path";
import { verifyToken } from "./auth.js";
import { metricsHandler, chantierRequests, httpRequestDuration, httpErrors } from "./metrics.js";
import responseTime from "response-time";
import nodemailer from "nodemailer";

dotenv.config({ path: resolve("../../.env") });
const { Pool } = pkg;
const app = express();
const port = process.env.API_PORT || 5000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

// ✅ Middleware pour mesurer la durée des requêtes
app.use(
  responseTime((req, res, time) => {
    const route = req.route ? req.route.path : req.path;
    const statusCode = res.statusCode;

    // Latence (convertie en secondes)
    httpRequestDuration.labels(req.method, route, statusCode).observe(time / 1000);

    // Compter les erreurs HTTP
    if (statusCode >= 400) {
      httpErrors.labels(req.method, route, statusCode).inc();
    }
  })
);

// ⚡ Route login admin
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === (process.env.ADMIN_USER || "admin") &&
    password === (process.env.ADMIN_PASS || "password")
  ) {
    const token = jwt.sign(
      { user: username },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  res.status(401).json({ error: "Identifiants invalides" });
});

// Health check
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "up" });
  } catch (e) {
    res.status(500).json({ status: "error", db: "down", error: e.message });
  }
});

// Liste des chantiers → public
app.get("/api/chantiers", async (req, res) => {
  chantierRequests.inc(); // ✅ incrémente à chaque appel
  try {
    const { rows } = await pool.query("SELECT * FROM chantiers ORDER BY id");
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Ajouter chantier → protégé
app.post("/api/chantiers", verifyToken, async (req, res) => {
  try {
    const { nom, ville } = req.body;
    if (!nom || !ville) {
      return res.status(400).json({ error: "Nom et ville sont requis" });
    }
    const result = await pool.query(
      "INSERT INTO chantiers (nom, ville) VALUES ($1, $2) RETURNING *",
      [nom, ville]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Modifier chantier → protégé
app.put("/api/chantiers/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, ville } = req.body;
    const result = await pool.query(
      "UPDATE chantiers SET nom=$1, ville=$2 WHERE id=$3 RETURNING *",
      [nom, ville, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Chantier non trouvé" });
    }
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Supprimer chantier → protégé
app.delete("/api/chantiers/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM chantiers WHERE id=$1", [id]);
    res.json({ message: "Chantier supprimé" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ✅ Exposer /metrics
app.get("/metrics", metricsHandler);

// === Route d’envoi d’email via le formulaire de contact ===
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    // Configuration du transport SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false, // true si port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // === Template HTML TIMI ===
    const htmlTemplate = `
    <div style="background-color:#f9f9f9;padding:40px 0;font-family:'Segoe UI',sans-serif;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
        <div style="background:#0b0b0b;color:white;padding:20px;text-align:center;">
          <h2 style="margin:0;font-size:22px;">🏗️ TIMI Contractors</h2>
          <p style="margin:0;color:#f2c94c;">Formulaire de contact</p>
        </div>
        <div style="padding:30px;">
          <p>Bonjour,</p>
          <p>Vous avez reçu un nouveau message depuis le site <strong>TIMI Contractors</strong> :</p>
          <div style="background:#f5f5f5;border-left:4px solid #f2c94c;padding:15px;margin:20px 0;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Message :</strong></p>
            <p style="white-space:pre-line;">${message}</p>
          </div>
          <p style="font-size:14px;color:#555;">
            💡 Répondez directement à cet email pour contacter l’expéditeur.
          </p>
        </div>
        <div style="background:#0b0b0b;color:#f2c94c;text-align:center;padding:15px;font-size:13px;">
          © ${new Date().getFullYear()} TIMI Contractors — Tous droits réservés
        </div>
      </div>
    </div>`;

    // === Envoi de l’email ===
    await transporter.sendMail({
      from: `"TIMI Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
      subject: `📩 Nouveau message de ${name}`,
      html: htmlTemplate,
    });

    res.json({ success: true, message: "Email envoyé avec succès ✅" });
  } catch (error) {
    console.error("Erreur SMTP :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
});

export default app;

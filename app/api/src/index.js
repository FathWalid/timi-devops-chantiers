import express from "express";
import pkg from "pg";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { resolve } from "path";
import { verifyToken } from "./auth.js";
import { metricsHandler, chantierRequests } from "./metrics.js";

dotenv.config({ path: resolve("../../.env") });
const { Pool } = pkg;
const app = express();
const port = process.env.API_PORT || 5000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

// ⚡ Route login admin
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Pour le POC : admin hardcodé
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
  chantierRequests.inc(); // ✅ incrément tout de suite à chaque appel

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

app.get("/metrics", metricsHandler);


export default app;

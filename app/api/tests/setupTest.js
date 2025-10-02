import dotenv from "dotenv";
import pkg from "pg";

// Charger les variables d'environnement depuis .env.test
dotenv.config({ path: ".env.test" });

const { Pool } = pkg;

console.log("Using DATABASE_URL:", process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL manquant dans .env.test !");
}

// Créer une connexion vers la DB de test
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { pool };

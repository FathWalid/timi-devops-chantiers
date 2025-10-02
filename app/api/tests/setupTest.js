import dotenv from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

dotenv.config({ path: ".env.test" });
console.log("Using DATABASE_URL:", process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL manquant dans .env.test !");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// rendre global pour index.js
global.__TEST_POOL__ = pool;

// ⚠️ On nettoie seulement UNE fois avant toute la suite
beforeAll(async () => {
  await pool.query("DELETE FROM chantiers");
});

afterAll(async () => {
  await pool.end();
});

export { pool };

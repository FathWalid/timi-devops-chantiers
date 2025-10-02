import fs from "fs";
import path from "path";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  // Charger le script SQL
  const sqlPath = path.resolve(__dirname, "../db/init/001_init.sql");
  const initSql = fs.readFileSync(sqlPath, "utf-8");

  // Créer les tables si elles n'existent pas
  await pool.query(initSql);
});

afterAll(async () => {
  await pool.end();
});

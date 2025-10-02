 import dotenv from "dotenv";
 import pkg from "pg";

 const { Pool } = pkg;

 // Charger .env.test avant tout
 dotenv.config({ path: ".env.test" });
 console.log("Using DATABASE_URL:", process.env.DATABASE_URL);

 if (!process.env.DATABASE_URL) {
   throw new Error("❌ DATABASE_URL manquant dans .env.test !");
 }

 // Créer une connexion vers la DB test
 const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
 });

- beforeEach(async () => {
-   await pool.query("DELETE FROM chantiers");
- });
+ // ⚡ Avant tous les tests, on s'assure que la table existe
+ beforeAll(async () => {
+   await pool.query(`
+     CREATE TABLE IF NOT EXISTS chantiers (
+       id SERIAL PRIMARY KEY,
+       nom VARCHAR(255) NOT NULL,
+       ville VARCHAR(255) NOT NULL,
+       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
+     );
+   `);
+   // On vide la table avant de commencer
+   await pool.query("DELETE FROM chantiers");
+ });

 afterAll(async () => {
   await pool.end();
 });

 export { pool };

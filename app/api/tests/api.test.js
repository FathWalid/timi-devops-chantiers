import request from "supertest";
import app from "../src/index.js";
import { pool } from "./setupTest.js";

let token;
let chantierId;

beforeAll(async () => {
  // Connexion admin → récupère un token JWT
  const res = await request(app)
    .post("/api/login")
    .send({
      username: process.env.ADMIN_USER || "admin",
      password: process.env.ADMIN_PASS || "password",
    });

  token = res.body.token;
  if (!token) throw new Error("❌ Impossible de récupérer un token JWT !");

  // Nettoyer la DB avant tests
  await pool.query("DELETE FROM incidents");
  await pool.query("DELETE FROM chantiers");
});

afterAll(async () => {
  await pool.end();
});

describe("API Chantiers (protégée)", () => {
  it("GET /health doit répondre ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.db).toBe("up");
  });

  it("POST /api/chantiers doit créer un chantier", async () => {
    const res = await request(app)
      .post("/api/chantiers")
      .set("Authorization", `Bearer ${token}`)
      .send({ nom: "Chantier Test", ville: "TestVille" });

    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe("Chantier Test");
    chantierId = res.body.id;
  });

  it("GET /api/chantiers doit renvoyer le chantier ajouté", async () => {
    const res = await request(app).get("/api/chantiers");
    expect(res.statusCode).toBe(200);
    expect(res.body.some((c) => c.nom === "Chantier Test")).toBe(true);
  });

  it("PUT /api/chantiers/:id doit modifier le chantier", async () => {
    const res = await request(app)
      .put(`/api/chantiers/${chantierId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nom: "Chantier Modifié", ville: "VilleMod" });

    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe("Chantier Modifié");
  });

  it("DELETE /api/chantiers/:id doit supprimer le chantier", async () => {
    const res = await request(app)
      .delete(`/api/chantiers/${chantierId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Chantier supprimé");
  });
});

import dotenv from "dotenv";
import request from "supertest";
import app from "../src/index.js";

dotenv.config({ path: ".env.test" });

describe("API Chantiers (protégée)", () => {
  let token;
  let chantierId;

  beforeAll(async () => {
    // 🔑 Login admin pour obtenir token
    const res = await request(app)
      .post("/api/login")
      .send({
        username: process.env.ADMIN_USER || "admin",
        password: process.env.ADMIN_PASS || "password",
      });

    token = res.body.token;
  });

  it("GET /health doit répondre ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.db).toBe("up");
  });

  it("POST /api/chantiers doit créer un chantier", async () => {
    const res = await request(app)
      .post("/api/chantiers")
      .set("Authorization", `Bearer ${token}`)
      .send({ nom: "Chantier Test", ville: "TestVille" });

    expect(res.statusCode).toBe(201);
    chantierId = res.body.id;
  });

  it("GET /api/chantiers doit renvoyer le chantier ajouté", async () => {
    const res = await request(app).get("/api/chantiers");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
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

import request from "supertest";
import app from "../src/index.js";
import { pool } from "./setupTest.js";

describe("API Chantiers", () => {
  let chantierId;

  it("GET /health doit répondre ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.db).toBe("up");
  });

  it("POST /api/chantiers doit créer un chantier", async () => {
    const res = await request(app)
      .post("/api/chantiers")
      .send({ nom: "Chantier Test", ville: "TestVille" })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe("Chantier Test");
    expect(res.body.ville).toBe("TestVille");
    chantierId = res.body.id;
  });

  it("GET /api/chantiers doit renvoyer un tableau contenant le chantier ajouté", async () => {
    const res = await request(app).get("/api/chantiers");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((c) => c.nom === "Chantier Test")).toBe(true);
  });

  it("PUT /api/chantiers/:id doit modifier le chantier", async () => {
    const res = await request(app)
      .put(`/api/chantiers/${chantierId}`)
      .send({ nom: "Chantier Modifié", ville: "VilleMod" })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe("Chantier Modifié");
    expect(res.body.ville).toBe("VilleMod");
  });

  it("DELETE /api/chantiers/:id doit supprimer le chantier", async () => {
    const res = await request(app).delete(`/api/chantiers/${chantierId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Chantier supprimé");
  });
});

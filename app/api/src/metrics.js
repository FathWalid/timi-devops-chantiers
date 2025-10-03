import client from "prom-client";

// Création du registre Prometheus
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Exemple de métrique custom
const chantierRequests = new client.Counter({
  name: "http_requests_chantiers_total",
  help: "Nombre total de requêtes GET sur /api/chantiers",
});
register.registerMetric(chantierRequests);

// Handler /metrics
export async function metricsHandler(req, res) {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
}

export { chantierRequests };

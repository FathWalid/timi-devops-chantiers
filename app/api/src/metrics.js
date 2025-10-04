// metrics.js
import client from "prom-client";

// Création du registre Prometheus
const register = new client.Registry();

// Métriques par défaut : CPU, mémoire, event loop, etc.
client.collectDefaultMetrics({ register });

// Compteur de requêtes sur /api/chantiers
const chantierRequests = new client.Counter({
  name: "http_requests_chantiers_total",
  help: "Nombre total de requêtes GET sur /api/chantiers",
});
register.registerMetric(chantierRequests);

// Histogramme pour mesurer la latence HTTP
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Durée des requêtes HTTP en secondes",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5], // intervalles de latence
});
register.registerMetric(httpRequestDuration);

// Compteur des erreurs HTTP
const httpErrors = new client.Counter({
  name: "http_requests_errors_total",
  help: "Nombre total d'erreurs HTTP",
  labelNames: ["method", "route", "status_code"],
});
register.registerMetric(httpErrors);

// Handler pour exposer /metrics
export async function metricsHandler(req, res) {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
}

export { chantierRequests, httpRequestDuration, httpErrors };

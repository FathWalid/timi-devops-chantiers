import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ error: "Token manquant" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(403).json({ error: "Format de token invalide" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "supersecret", (err, user) => {
    if (err) return res.status(401).json({ error: "Token invalide ou expiré" });
    req.user = user;
    next();
  });
}

import app from "./index.js";

const port = process.env.API_PORT || 5000;

app.listen(port, () => {
  console.log(`[api] listening on ${port}`);
});

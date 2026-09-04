import fetch from "node-fetch";

export default async function handler(req, res) {
  const { GITHUB_TOKEN, GITHUB_USER, GITHUB_REPO } = process.env;

  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/data/progreso.json`;

  const response = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Error al leer progreso:", text);
    return res.status(500).json({ error: "No se pudo leer progreso" });
  }

  const data = await response.json();
  const content = JSON.parse(Buffer.from(data.content, "base64").toString());

  res.status(200).json({ json: content, sha: data.sha });
}

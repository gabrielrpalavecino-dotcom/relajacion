import fetch from "node-fetch";

export default async function handler(req, res) {
  const { GITHUB_TOKEN, GITHUB_USER, GITHUB_REPO } = process.env;

  const { newData, sha } = req.body;

  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/data/progreso.json`;

  const encoded = Buffer.from(JSON.stringify(newData, null, 2)).toString("base64");

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Actualización de progreso",
      content: encoded,
      sha
    })
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Error al guardar progreso:", text);
    return res.status(500).json({ error: "No se pudo guardar progreso" });
  }

  const result = await response.json();
  res.status(200).json(result);
}

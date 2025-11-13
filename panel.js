export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode tidak diizinkan" });
  }

  const { username, paket } = req.body;
  if (!username || !paket) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  try {
    // Contoh: request ke API Pterodactyl kamu
    const response = await fetch("https://yogzzxxpublikk.zonapanel.web.id/api/application/servers", {
      method: "POST",
      headers: {
        "Authorization": "Bearer ptla_4aW8bc2wBcQWnAxspqhSE5MYuxoyOW0LlT7iPezhZRM",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: username,
        user: 1,
        egg: 15,
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: "npm start",
        environment: {},
        limits: { memory: 1024, swap: 0, disk: 1024, io: 500, cpu: 100 },
        feature_limits: { databases: 1, allocations: 1 },
        allocation: { default: 1 }
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: result });
    }

    return res.status(200).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
        }

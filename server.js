const express = require("express");
const cors = require("cors");
const { neon } = require("@neondatabase/serverless");

const app = express();

app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

app.get("/health", async (req, res) => {
  try {

    const result = await sql`
      SELECT NOW() as time
    `;

    res.json({
      ok: true,
      service: "poseidon-api",
      db: "connected",
      time: result[0].time
    });

  } catch (err) {

    res.status(500).json({
      ok: false,
      error: err.message
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Poseidon API running on ${PORT}`);
});

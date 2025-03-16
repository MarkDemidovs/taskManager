const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { name } = req.body;

    // Find the highest order_index and increment by 1
    const orderResult = await pool.query("SELECT MAX(order_index) FROM tasks");
    const nextOrder = (orderResult.rows[0].max || 0) + 1;

    const result = await pool.query(
      "INSERT INTO tasks (name, completed, order_index) VALUES ($1, $2, $3) RETURNING *",
      [name, false, nextOrder]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const express = require("express");
const app = express(); // ✅ HARUS duluan
const pool = require("./db");
const path = require("path");

// SET VIEW ENGINE
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));






/**
 * GET ALL PROJECTS
 * (join semua tabel: users + technologies)
 */
/**
 * HOME (list project)
 */
app.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.title,
        p.description,
        p.start_date,
        p.end_date,
        p.image,
        u.name AS author,
        ARRAY_AGG(t.name) AS technologies
      FROM projects p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      LEFT JOIN technologies t ON pt.technology_id = t.id
      GROUP BY p.id, u.name
      ORDER BY p.id DESC
    `);

    res.render("index", {
      projects: result.rows
    });

  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

/**
 * DETAIL
 */
app.get("/project/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        u.name AS author,
        ARRAY_AGG(t.name) AS technologies
      FROM projects p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      LEFT JOIN technologies t ON pt.technology_id = t.id
      WHERE p.id = $1
      GROUP BY p.id, u.name
    `, [id]);

    res.render("project-detail", {
      project: result.rows[0]
    });

  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

app.listen(7000, () => {
  console.log("Server jalan di http://localhost:7000");
});


app.get("/projects", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.title,
        p.description,
        p.start_date,
        p.end_date,
        p.image,
        u.name AS user_name,
        ARRAY_AGG(t.name) AS technologies
      FROM projects p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      LEFT JOIN technologies t ON pt.technology_id = t.id
      GROUP BY p.id, u.name
      ORDER BY p.id DESC
    `);

    res.json({
      message: "Success get all projects",
      data: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET PROJECT BY ID
 */
app.get("/project/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        u.name AS user_name,
        ARRAY_AGG(t.name) AS technologies
      FROM projects p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      LEFT JOIN technologies t ON pt.technology_id = t.id
      WHERE p.id = $1
      GROUP BY p.id, u.name
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Success get project detail",
      data: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET USERS
 */
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.json({
      message: "Success get users",
      data: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET TECHNOLOGIES
 */
app.get("/technologies", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM technologies`);

    res.json({
      message: "Success get technologies",
      data: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



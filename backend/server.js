import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tecnohogar"
});

app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/guardar", (req, res) => {
  const { nombre, correo, mensaje , telefono} = req.body;
  db.query("INSERT INTO contactos (nombre, correo, mensaje, telefono) VALUES (?, ?, ?, ?)", [nombre, correo, mensaje, telefono], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Datos guardados correctamente");
  });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));

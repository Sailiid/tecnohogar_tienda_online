const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Lianestefania15*",
    database: "contactos_formulario"
});

db.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});
app.get("/", (req, res) => {
    res.send("Servidor conectado a MySQL");
});

app.post("/guardar", (req, res) => {
  const { nombre, correo, mensaje , telefono} = req.body;
  console.log("Datos recibidos:", req.body);
  if (!nombre || !correo || !mensaje || !telefono) {
    return res.status(400).send("Faltan datos requeridos");
  }
  const sql = "INSERT INTO contactos (nombre, correo, mensaje, telefono) VALUES (?, ?, ?, ?)";
  db.query(sql, [nombre, correo, mensaje, telefono], (err, result) => {
    if (err) {
      console.error("Error SQL", err);
      return res.status(500).send("Error en servidor");
    }
    console.log("Registro ingresado", result)
    res.send("Datos guardados correctamente");
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000")
});

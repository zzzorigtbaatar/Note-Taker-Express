const express = require("express");
const fs = require("fs");

const path = require("path");
const note_db = require("./db/db.json");

const { randomUUID } = require("crypto");

const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => res.json(note_db));

app.listen(PORT, () => {
    console.log(`Example app listening at https://localhost:${PORT}`);
});
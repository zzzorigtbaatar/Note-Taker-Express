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

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        id: randomUUID(),
        title: title,
        text: text,
    };

    note_db.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(note_db), (err) =>
        err ? console.error(err) : console.log("Success")
    );

    res.send(note_db);
});

app.delete("/api/notes/:id", (req, res) => {
    const index = note_db
        .map((item) => {
            return item.id;
        })
        .indexOf(req.params.id);

    note_db.splice(index, 1);

    fs.writeFile("./db/db.json", JSON.stringify(note_db), (err) =>
        err ? console.error(err) : console.log("Success")
    );

    res.json({});
});

app.listen(PORT, () => {
    console.log(`Example app listening at https://localhost:${PORT}`);
});
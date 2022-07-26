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
    //obtain data from request parameter
    const { title, text } = req.body;
    //create new note object with obtained data
    const newNote = {
        id: randomUUID(),
        title: title,
        text: text,
    };
    //add new note object to notes database
    note_db.push(newNote);
    //update json database on local storage
    fs.writeFile("./db/db.json", JSON.stringify(note_db), (err) =>
        err ? console.error(err) : console.log("Success")
    );
    //return updated notes database as response
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
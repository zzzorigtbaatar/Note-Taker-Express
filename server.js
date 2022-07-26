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

app.listen(PORT, () => {
    console.log(`Example app listening at https://localhost:${PORT}`);
});
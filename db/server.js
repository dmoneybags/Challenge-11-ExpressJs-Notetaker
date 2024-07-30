const express = require("express");
const fs = require("fs");
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    console.log("recieved request to get notes");
    const notesStr =fs.readFileSync(path.join(__dirname, "/db.json"))
    console.log("read notes");
    const notes = JSON.parse(notesStr);
    console.log('Read notes of: ');
    console.log(notes);
    res.json(notes);
})

app.post("/api/notes", (req, res) => {
    const note = req.body;
    const notesStr =fs.readFileSync(path.join(__dirname, "/db.json"))
    console.log("read notes");
    const notes = JSON.parse(notesStr);
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, "/db.json"), JSON.stringify(notes));
    res.json("added successfully");
})

app.get("/notes", (req, res) => {
    console.log("Recieved get request");
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
  
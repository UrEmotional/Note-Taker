const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const express = require('express');
const app = express();
let allNotes = require('./db/db.json');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(allNotes);
});


app.get("/api/notes/:id", (req, res) => {
  req.params.id;
  res.send(``);
});

  app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    allNotes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) => {
      if (err) throw err;
      res.json(allNotes);
    });
  });
app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i].id === noteId) {
      allNotes.splice(i, 1);
    }
  }
  fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) => {
    if (err) throw err;
    res.json(allNotes);
  });
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../db', 'db.json');

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'notes.html'));
});

router.get('/api/notes', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading notes from database.' });
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

router.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    res.status(400).json({ error: 'Please provide both title and text.' });
  } else {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Error reading notes from database.' });
      } else {
        const notes = JSON.parse(data);
        const newNote = { id: uuidv4(), title, text };
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes), 'utf8', err => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error writing note to database.' });
          } else {
            res.json(newNote);
          }
        });
      }
    });
  }
});

router.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Error reading notes from database.' });
    } else {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter(note => note.id !== id);
      if (filteredNotes.length === notes.length) {
        res.status(404).json({ error: `Note with id ${id} not found.` });
      } else {
        fs.writeFile(dbPath, JSON.stringify(filteredNotes), 'utf8', err => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error writing notes to database.' });
          } else {
            res.json({ message: `Note with id ${id} has been deleted.` });
          }
        });
      }
    }
  });
});

module.exports = router;

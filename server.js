// dependencies and variables
const express = require('express');
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');
const app = express();

//port
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/assets')));

//requests handlers
//display routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);


//data routes
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.send(data);
    }
  });
});
app.post('/api/notes', (req, res) => {
  //not recognizing the below as a function??
  
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    //check to see if db is empty
    let noteData = JSON.parse(data);
    let newNote = req.body;
    newNote['id'] = uniqid;
    console.log(newNote);
    noteData.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => {
      if (err) throw err;
      res.send(newNote);
    });
  });
});
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
//port listener
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});

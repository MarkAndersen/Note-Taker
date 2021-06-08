// dependencies and variables
const express = require('express');
const fs = require('fs');
//var uniqid = require('uniqid');
const path = require('path');
const app = express();

//port 
const PORT = 3000;
const notes = [];

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/assets')));

//requests handlers
//display routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

//data routes
app.get('/api/notes', (req, res) => {
    // const newNote = res.body;
    // notes.push(newNote);
    fs.readFile('./db/db.json', "utf8", (err, data)=> {
        if(err) throw error;
        console.log(data)
    });
    res.json(notes);
});
// app.post('/api/notes', (req, res) => {
//     const newNote = req.body;
//     if(err) throw error;
//     notes.push(addNote);
//     fs.readFile('../../../db/db.json', "utf8")(error, data) => {
        
      
        
//     };
    // connect to db.JSON
    // push data up to JSON
    // generate unique ID's for return JSON

//port listener
app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})


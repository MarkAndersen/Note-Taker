// dependencies and variables
const express = require('express');
const fs = require('fs');
const uniqid = require('uniqid')
const path = require('path');
const app = express();

//port 
const PORT = 3000;


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
    fs.readFile('./db/db.json', "utf8", (err, data)=> {
        if (err) {
            console.error(err);
        } else {
            res.send(data);
        };
        
    })
});
app.post('/api/notes', (req, res) => {
  
    //not recognizing the below as a function??
       // savedNote.push(newNote);
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if (err) throw (err);
        let savedNote = JSON.parse(data);
        let newNote = req.body;
        newNote['id'] = uniqid;
        console.log(savedNote);
    fs.writeFile("./db/db.json", JSON.stringify(data), err => {
    if (err) {
        console.error(err);
    } res.send(newNote);
});
    // 
    //     if (err) {
    //         console.error(err);
    //     } else{
            
          
            
    //     });

    //     };
        
    });
    
    
    // generate unique ID's for return JSON
});
//port listener
app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
});


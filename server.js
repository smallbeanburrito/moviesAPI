/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Keith Cao Student ID: 1443332211 Date: June 1, 2023 
*  Cyclic Link: https://zany-gray-starfish-wrap.cyclic.app/
*
********************************************************************************/ 


express = require('express');
app = express();
cors = require('cors');
app.use(cors());
app.use("/js", express.static('./js/'));
require('dotenv').config();
const path = require('path');

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(express.json());

HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/api/movies", (req,res) => {
    db.addNewMovie(req.body)
    .then((data) => res.status(201).send(data))
    .catch(() => res.status(500).send("error creating movie"));
});

app.get("/api/movies", (req,res) => {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then((data) => res.send(data))
    .catch(() => res.status(500).send("error retrieving movies"));
});

app.get("/api/movies/:id", (req,res) => {
    db.getMovieById(req.params.id)
    .then((data) => res.send(data))
    .catch(() => res.status(500).send("error retrieving movie"));
});

app.put("/api/movies/:id", (req,res) => {
    db.updateMovieById(req.body, req.params.id)
    .then((data) => res.status(204).send(data))
    .catch(() => res.status(500).send("error updating movie"));
});

app.delete("/api/movies/:id", (req,res) => {
    db.deleteMovieById(req.params.id)
    .then((data) => res.status(204).send(data))
    .catch(() => res.status(500).send("error deleting movie"));
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

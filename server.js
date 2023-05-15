express = require('express');
app = express();
cors = require('cors');
app.use(cors());
require('dotenv').config();

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(express.json());

HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req,res) => {
    res.send({message:"API Listening"});
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

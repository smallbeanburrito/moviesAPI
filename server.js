express = require('express');
app = express();
cors = require('cors');
app.use(cors());
require('dotenv').config();

app.use(express.json());

HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req,res) => {
    res.send({message:"API Listening"});
});

app.listen(HTTP_PORT);
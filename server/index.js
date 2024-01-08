const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
    console.log(req.body.code);
    var data = {
        'code': ' public class Main {' + req.body.code + '}',
        'language': 'java',
        'input': req.body.input
    };
    var config = {
        method: 'post',
        // note changes in url: https://api.codex.jaagrav.in --> https://codex-api.fly.dev/
        url: 'https://codex-api.fly.dev/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
    
    axios(config)
      .then((response) => {
        res.send(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
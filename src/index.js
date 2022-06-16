const express = require('express');
const req = require('express/lib/request');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const csvtojson = require('csvtojson');
const parse = require('csv-parser');
const fs = require('fs');
const app = express();
const csvDecoded = [];

app.use(express.json());

app.post('/api/csv', (req, res) =>{
  const base64csv = req.body.base64csv
  const base64decoded = new Buffer.from(base64csv, "base64").toString("ascii");
  console.log(base64decoded)
  csvtojson()
  .fromString(base64decoded)
  .then((json) => {
    res.send(json);
  });
});


const port = process.env.port || 80;
app.listen(port, () => console.log("Listening"));
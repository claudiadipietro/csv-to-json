import express from 'express';
import csvtojson from 'csvtojson';

const app = express();
app.use(express.json());

const type = 'base64'

app.post('/api/csv', (request, response) =>{
  const base64File = request.body.base64File
  const base64Buffer = new Buffer.from(base64File, type);
  const base64Decoded = base64Buffer.toString('ascii');
  csvtojson()
  .fromString(base64Decoded)
  .then((json) => {
    response.send(json);
  });
});

export default app;

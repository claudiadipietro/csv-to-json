import express from 'express';
import csvtojson from 'csvtojson';
import getFileDecoded from './helpers/get_file_decoded.js';
import convertNumericStringsToNumbers from './helpers/convert_numbers.js';

const app = express();
app.use(express.json());

app.post('/api/csv', (request, response) =>{
  const base64Decoded = getFileDecoded(request);
  if (!base64Decoded) {
    return response.status(200).send(['No file uploaded']);
  }
  csvtojson().fromString(base64Decoded).then((json) => {
    const jsonArray = convertNumericStringsToNumbers(json);
    return response.send(jsonArray);
  });
});

export default app;

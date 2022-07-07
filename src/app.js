import express from 'express';
import csvtojson from 'csvtojson';
import getFileDecoded from './helpers/get_file_decoded.js';
import convertNumericStringsToNumbers from './helpers/convert_numbers.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/csv', (request, response) =>{
  const base64Decoded = getFileDecoded(request);
  if (!base64Decoded) {
    return response.status(200).send(['No file uploaded']);
  }
  csvtojson().fromString(base64Decoded).then((json) => {
    const numbersConvertedJson = convertNumericStringsToNumbers(json);
    return response.status(200).send(numbersConvertedJson);
  });
});

export default app;

import express from 'express';
import csvtojson from 'csvtojson';

const app = express();
app.use(express.json());

app.post('/api/csv', (request, response) =>{
  const base64Decoded = getFileDecoded(request);
  if (!base64Decoded) {
    return response.status(200).send(['No file uploaded']);
  }
  csvtojson().fromString(base64Decoded).then((json) => {
    console.log(json)
    const jsonArray = convertNumericStringsToNumbers(json);
    return response.send(jsonArray);
  });
});

function getFileDecoded (request) {
  const base64File = request.body?.base64File
  if (!base64File) {
    return false;
  }
  const base64Buffer = new Buffer.from(base64File, 'base64');
  const base64Decoded = base64Buffer.toString('ascii');
  return base64Decoded;
}

function convertNumericStringsToNumbers (jsonArray) {
  for (var jsonObjectIndex in jsonArray) {
    const jsonObject = jsonArray[jsonObjectIndex];
    for (var property in jsonObject) {
        if (Number(jsonObject[property])){
          jsonArray[jsonObjectIndex][property] = Number(jsonObject[property]);
        }
    }
  }
  return jsonArray;
}

export default app;

import app from '../src/app.js';
import request from 'supertest';
import fs from 'fs';

describe('CSV Endpoint', () => {  
  test('Should return an array', async () => {
    await request(app).post('/api/csv')
    .expect(200)
    .expect(response => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  test('Should return a message when no csv was uploaded', async () => {
    await request(app).post('/api/csv').send({})
    .expect(200)
    .expect(response => {
      expect(response.body).toEqual(['No file uploaded']);
    });
  });
  test('Should return the data from the csv uploaded', async () => {
    const base64 = fs.readFileSync('tests' + '/test_file.csv', 'base64');
    await request(app).post('/api/csv').send({ base64File: `${base64}` })
    .expect(200)
    .expect(response => {
      expect(response.body).toEqual([{
        "test": "yes",
        "name": "Claudia",
        "last_name": "Di Pietro",
        "age": 21
      },{
        "test": "yes",
        "name": "Andrea",
        "last_name": "Covian",
        "age": 21
      }]);
    });
  });
})

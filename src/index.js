import app from './app.js';

const port = process.env.port || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

import app from './app.js';

const port = process.env.port || 80;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

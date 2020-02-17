import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.listen(3000, () => {
  console.log('listening on port 3000');

  const nomes = ['Joao', 'Maria', 'Jose', 'Pedro'];
});


function teste(n1, n2) {
  return n1 * n2;
}

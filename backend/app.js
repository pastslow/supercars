const express = require('express');
const bodyParser = require('body-parser');
const mySql = require('mysql');

const connection = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cars_rent_node'
});

connection.connect((error) => {
  if (error) {
    console.log('error', error);
  } else {
    console.log('connection successfully');
  }
})

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
  next();
})

app.post('/api/posts', (req, res, next) => {
  console.log(res.body);
});


app.get('/api/cars', (req, res, next) => {
  connection.query('SELECT * FROM cars', (error, rows, fields) => {
    if (error) {
      console.log('error', error);
    } else {
      console.log(rows);
      req.status(200).json({
        message: 'Post fetched successfully',
        cars:rows
      })
    }
  })
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { name: 'Robert', message: 'Hello all' },
    { name: 'Iulian', message: 'Ciao Robert' }
  ]

  res.status(200).json({
    message: 'Post fetched successfully',
    posts: posts
  })
});

module.exports = app;

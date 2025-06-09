const express = require('express');
const nodemon = require('nodemon');

const app = express();

const port = 1024 || 8000;

app.get('/', (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`server is running on port  ${port}`));

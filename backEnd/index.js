require('dotenv').config()
const {env} = require('process');
const express = require('express');
const nodemon = require('nodemon');

const app = express();

const port = env.PORT;

app.get('/', (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`server is running on port  ${port}`));

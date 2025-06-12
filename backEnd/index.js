require('dotenv').config()
const {env} = require('process');
const express = require('express');
const path = require('path');
const db = require('./config/DBconection');

const app = express();

const port = env.PORT;

app.use(express.static(path.join(__dirname, "/frontend/build")));

// connect to database
db.conection()

app.get('/api', (req, res) => {
  res.json({ message: 'Hello' });
});

// app.get('/', (req, res) => res.send("hello world"));
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});


app.listen(port, () => console.log(`server is running on port  ${port}`));

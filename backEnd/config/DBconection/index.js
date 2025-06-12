require('dotenv').config();
const { env } = require('process');
const mongoose = require('mongoose');

async function conection() {
    try {
        await mongoose.connect(env.URI);
        console.log("Connected DB");
    } catch (e) {
        console.log("fail to conect DB");
    }
}

module.exports = { conection };
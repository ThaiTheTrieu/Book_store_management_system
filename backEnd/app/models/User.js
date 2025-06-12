const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {type: string, require: true},
    username: {type: string, require: true},
    hashPassword: {type: string, require: true},
    
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('User', userSchema);
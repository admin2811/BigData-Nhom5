const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    code : String,
    name : String,
    codeSubject : String,
    nameSubject : String,
    scoreMid: Number,
    scoreEnd: Number,
    scoreTotal: Number,
})

module.exports = mongoose.model('score', scoreSchema);
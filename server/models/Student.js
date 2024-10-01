const { default: mongoose } = require("mongoose")

//schema
const schemaData = mongoose.Schema({
    code: String,
    name: String,
    dateOfBirth: String,
    address: String,
    sex: String,
    email: String,
    mobile: String,
    class: String,
},{
    timestamps: true
})

module.exports = mongoose.model('student', schemaData);
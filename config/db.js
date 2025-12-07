const  mongoose  = require("mongoose")
const dotenv = require('dotenv').config();
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(dotenv);
const DB_URL = process.env.DB_URI

console.log(DB_URL);

const ConnectDB = async() => {
try {
    await mongoose.connect(DB_URL)
    console.log('DataBase Connected Successfully ✅')
} catch (error) {
    console.error('error on Connecting Database ❌', error.message)
}
}
module.exports = ConnectDB;



const mongoose = require('mongoose')
require("dotenv").config()
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_LINK)
  console.log(`MongoDB connect ${conn.connection.host}`.cyan.bold)
}

module.exports = connectDB;
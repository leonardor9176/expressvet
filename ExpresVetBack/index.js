const express = require('express')
const cors = require('cors')
const {connectDB} = require("./database/database")
const app = express()

// const http = require('http').Server(app)
const bodyParser = require('body-parser')
const config = require('./config/config')

connectDB();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api", require('./routes/index'))

app.listen(config.port, () => {
  console.log('Server is running in port', config.port);
});

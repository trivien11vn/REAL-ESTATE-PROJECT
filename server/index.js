const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbconnect = require('./config/dbconn');
const initRoute = require('./routes')
const app = express()
require('./config/redis.config')

//middleware
app.use(cors({
    origin: process.env.CLIENT_URL
}))
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

initRoute(app)
dbconnect()

const PORT = process.env.PORT || 7777
app.listen(PORT, ()=>{console.log('Server on port ' + PORT)})
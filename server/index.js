const express = require('express');

const app = express()

app.use('/', (req, res)=>{res.send('SERVER ON')})

app.listen(5000, ()=>{console.log('Server on port 5000')})
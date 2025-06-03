const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app= express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('historical-artifacts is running...')
})

app.listen(port,()=>{
    console.log(`server is running from port: ${port}`);
})
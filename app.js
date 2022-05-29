const express = require('express');
const fs = require('fs');

const app = express();

const tours = JSON.parse(fs.readFileSync(`$(__dirname)/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours',(req,resp)=>{
    resp
    .status(200)
    .json({
        status:'success',
        tours:tours
})

app.post('/',(req,resp)=>{
    res.send("You can Post to here")
})

const port = 3000;
app.listen(port,()=>{
    console.log(`App running on PORT ${port}...`)
})
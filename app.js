const express = require('express');

const app = express();

app.get('/',(req,resp)=>{
    resp
    .status(200)
    .json({message:"Server response from root page",app:"AuNatureaux"})
})

app.post('/',(req,resp)=>{
    res.send("You can Post to here")
})

const port = 3000;
app.listen(port,()=>{
    console.log(`App running on PORT ${port}...`)
})
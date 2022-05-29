const express = require('express');

const app = express();

app.get('/',(req,resp)=>{
    resp.status(200).send("Server response from root page")
})

const port = 3000;
app.listen(port,()=>{
    console.log("App running on PORT ${port}...")
})
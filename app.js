const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const app = express();

// MIDDLEWARE 
app.use(express.json());
app.use(morgan('dev'));

app.use((req,res,next)=>{
    console.log("middlewear for middle earth");
    next();
});

app.use((req,res,next)=>{
    req.getTime = new Date().toISOString();
    console.log(req.getTime);
    next();
})

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

// RUN SERVER 
const port = 3000;
app.listen(port, () => {
    console.log(`App running on PORT ${port}...`)
})
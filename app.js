const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const app = express();

// MIDDLEWARE 
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

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

module.exports = app;
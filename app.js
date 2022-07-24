const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const tourRouter = express.Router();
const userRouter = express.Router();


// MIDDLEWARE 

const app = express();
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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// ROUTE HANDLERS

const getAllTours = (req,res) =>{
    res.status(200).json({
        status: 'success',
        time:req.getTime,
        results: tours.length,
        data:{tours}
    })
}

const getSingleTour = (req, res) => {
    const id = req.params.id * 1;
    const singleTour = tours.find(item=>
        item.id === id)
        if(!singleTour){
            return res.status(404).json({
                status:"Fail",
                message:"Id Does not Exist"
            })
        }
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{tour:singleTour}
    })
}

const createTour = (req, res) => {
    console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        newId
    }, req.body);
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        res
            .status(201)
            .json({
                status: 'success',
                data: {
                    tour: newTour
                },
            })
    });
}

const updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:"Fail",
            message:"Id Does not Exist"
        })
    }
        res
        .status(200)
        .json({
            status: 'success',
            data: {
                tour: `Patch stuff`
            },
        })
};

const deleteTour = (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:"Fail",
            message:"Id Does not Exist"
        })
    }
        res
        .status(204)
        .json({
            status: 'success',
            data: null
        })
};

const getAllUsers = (req,res) => {
    res.status(500).json({
        status:500,
        message:"Route not created yet"
    })

}
const createUser = (req,res) => {
    res.status(500).json({
        status:500,
        message:"Route not created yet"
    })

}
const getUser = (req,res) => {
    res.status(500).json({
        status:500,
        message:"Route not created yet"
    })

}
const updateUser = (req,res) => {
    res.status(500).json({
        status:500,
        message:"Route not created yet"
    })

}
const deleteUser = (req,res) => {
    res.status(500).json({
        status:500,
        message:"Route not created yet"
    })
}


// ROUTES

tourRouter
.route('/')
.get(getAllTours)
.post(createTour)

tourRouter
.route('/:id')
.get(getSingleTour)
.patch(updateTour)
.delete(deleteTour)

userRouter
.route('/')
.get(getAllUsers)
.post(createUser)

userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

app.use('/api/v1/tours',tourRouter);
app.use('/api/vi/users',userRouter);

// RUN SERVER 
const port = 3000;
app.listen(port, () => {
    console.log(`App running on PORT ${port}...`)
})
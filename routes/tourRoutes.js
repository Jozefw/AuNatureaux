const express = require('express')
const fs = require('fs');
const router = express.Router();


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

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


// ROUTES
router
.route('/')
.get(getAllTours)
.post(createTour)

router
.route('/:id')
.get(getSingleTour)
.patch(updateTour)
.delete(deleteTour)

module.exports =router
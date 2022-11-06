const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:"Fail",
            message:"Id Does not Exist"
        })
    }
    next();
}

exports.checkBody = (req, res, next)=>{
    if(!req.body.name || !req.body.price ){
        return res
        .status(400)
        .json({
            status:"Fail",
            message:"Name or Price Missing"
        })
    }
    next();
}

// ROUTE HANDLERS
exports.getAllTours = (req,res) =>{
    res.status(200).json({
        status: 'success',
        time:req.getTime,
        results: tours.length,
        data:{tours}
    })
}

exports.getSingleTour = (req, res) => {
    const id = req.params.id * 1;
    const singleTour = tours.find(item=>
        item.id === id)
      
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{tour:singleTour}
    })
}

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
        res
        .status(200)
        .json({
            status: 'success',
            data: {
                tour: `Patch stuff`
            },
        })
};

exports.deleteTour = (req, res) => {
        res
        .status(204)
        .json({
            status: 'success',
            data: null
        })
};

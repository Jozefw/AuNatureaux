const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkId = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Id Does not Exist',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'Fail',
//       message: 'Name or Price Missing',
//     });
//   }
//   next();
// };

// ROUTE HANDLERS
exports.getAllTours = async (req, res) => {
  try {
    const { page, sort, limit, fields, ...queryObj } = req.query;
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|lte|lt|gt)\b/g,
      (match) => `$${match}`
    );
    console.log(queryString);
    let preTours = Tour.find(JSON.parse(queryString));
    if (sort) {
      preTours = preTours.sort(sort);
    }
    // console.log(allTours);
    const allTours = await preTours;
    // console.log(allTours);
    res.status(200).json({
      status: 'success',
      results: allTours.length,
      data: { allTours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSingleTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour: tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail to find by id',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  // const newId = tours[tours.length - 1].id + 1;
  // // eslint-disable-next-line node/no-unsupported-features/es-syntax
  // const newTour = { newId, ...req.body };
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   () => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};

exports.updateTour = async (req, res) => {
  try {
    const newTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid updated data sent',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid deletion data sent',
    });
  }
};

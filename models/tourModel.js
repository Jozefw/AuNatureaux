const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  durations:{
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a Group Size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAvg: {
    type: Number,
    default: 4.5,
  },
  ratingsQty: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A price must be a valid number'],
  },
});
const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;

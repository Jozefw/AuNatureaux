const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
).replace('<username>', process.env.DB_USER);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Import Connection Established...uplinking to database');
  });

// read json file

const toursTransferred = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data into DB_USER
const importData = async (req, res) => {
  try {
    await Tour.create(toursTransferred);
    console.log('Data transfer success');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete existing data
const deleteExistingData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deletion success');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteExistingData();
}

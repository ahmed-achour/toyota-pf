const express = require("express");
const multer = require('multer')

const app = express();
const path = require('path');

const Cars = require("../models/cars")
const { isAuthorized, isDircteur } = require("./../middlewares/auth")

// Set The Storage Engine
const storage = multer.diskStorage(
  {

    destination: './assets/images/cars',

    filename: function (req, file, cb) {
      let name = req.body.firstname.replace(' ', '').toLowerCase();

      cb(null, name + '-' + Date.now() + path.extname(file.originalname));
    }
  }
);

// Check File Type
function checkFileType(file, cb) {

  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;

  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype == true && extname == true) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init Upload
const upload = multer({

  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

app.post('/', [isAuthorized, isDircteur, upload.single('picture'), isDircteur], async(req, res) =>{
    try {
        let data = req.body;
        let file = req.file
        let car = new Cars({
            qr_code: data.qr_code,
            model: data.model,
            price: data.price,
            photo:file.filename,
            description: data.description
        });
        
        await car.save();

        res.status(200).send({ message: "car added succed !" })

    } catch (error) {
        res.status(400).send({ message: "please check up your added information"})
    }
});

app.get('/', async(req, res)=> {
    try {
        let cars = await Cars.find()
        res.status(200).send(cars)
    } catch (error) {
        res.status(400).send({ message: "Error fetching cars !", error: error })
    }

});

app.get('/:id', async (req, res) => {
    try {
      let carId = req.params.id
  
      let car = await Cars.findOne({ _id: carId })
  
      if (car)
        res.status(200).send(car)
      else
        res.status(404).send({ message: "Cars not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching cars !", error: error })
    }
  })
  
app.patch('/:id', [isAuthorized, isDircteur], async (req, res) => {
    try {
      let carId = req.params.id
      let data = req.body
      let car = await Cars.findOneAndUpdate({ _id: carId }, data)
  
      if (car)
        res.status(200).send({ message: "Cars updated !" })
      else
        res.status(404).send({ message: "Cars not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching cars !", error: error })
    }
  
  })
  
app.delete('/:id',[isAuthorized, isDircteur], async (req, res) => {
    try {
      let carId = req.params.id
  
      let car = await Cars.findOneAndDelete({ _id: carId })
  
      if (car)
        res.status(200).send({ message: "Cars deleted !" })
      else
        res.status(404).send({ message: "Cars not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching cars !", error: error })
    }
  })
  

  module.exports = app
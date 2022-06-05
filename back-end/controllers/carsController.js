const express = require("express");
const Cars = require("../models/cars")
const app = express();

app.post('/', async(req, res) =>{
    try {
        let data = req.body;
        let car = new Cars({
            photo: data.photo,
            qr_code: data.qr_code,
            model: data.model,
            price: data.price
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
  
  app.patch('/:id', async (req, res) => {
    try {
      let carId = req.params.id
      let data = req.body
  
      if (data.hasOwnProperty('password')) {
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
      }
  
      let car = await Cars.findOneAndUpdate({ _id: carId }, data)
  
      if (car)
        res.status(200).send({ message: "Cars updated !" })
      else
        res.status(404).send({ message: "Cars not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching cars !", error: error })
    }
  
  })
  
  app.delete('/:id', async (req, res) => {
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
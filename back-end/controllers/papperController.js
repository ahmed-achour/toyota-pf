const express = require("express");
const Pappers = require("../models/papper")
const app = express();

app.post('/', async(req, res) =>{
    try {
        let data = req.body;
        let papper = new Pappers({
            type: data.type,
            client_id: data.client_id,
            content: data.content,
        });
        
        await papper.save();

        res.status(200).send({ message: "papper added succed !" })

    } catch (error) {
        res.status(400).send({ message: "please check up your added information"})
    }
});

app.get('/', async(req, res)=> {
    try {
        let pappers = await Pappers.find()
        res.status(200).send(pappers)
    } catch (error) {
        res.status(400).send({ message: "Error fetching pappers !", error: error })
    }

});

app.get('/:id', async (req, res) => {
    try {
      let papperId = req.params.id
  
      let papper = await Pappers.findOne({ _id: papperId })
  
      if (papper)
        res.status(200).send(papper)
      else
        res.status(404).send({ message: "Pappers not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching pappers !", error: error })
    }
  })
  
  app.patch('/:id', async (req, res) => {
    try {
      let papperId = req.params.id
      let data = req.body
  
      if (data.hasOwnProperty('password')) {
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
      }
  
      let papper = await Pappers.findOneAndUpdate({ _id: papperId }, data)
  
      if (papper)
        res.status(200).send({ message: "Pappers updated !" })
      else
        res.status(404).send({ message: "Pappers not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching pappers !", error: error })
    }
  
  })
  
  app.delete('/:id', async (req, res) => {
    try {
      let papperId = req.params.id
  
      let papper = await Pappers.findOneAndDelete({ _id: papperId })
  
      if (papper)
        res.status(200).send({ message: "Pappers deleted !" })
      else
        res.status(404).send({ message: "Pappers not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching pappers !", error: error })
    }
  })
  

  module.exports = app
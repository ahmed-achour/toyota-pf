const express = require("express");
const Clients = require("../models/clientAccount")
const app = express();

app.post('/', async(req, res) =>{
    try {
        let data = req.body;
        let client = new Clients({
            photo: data.photo,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            total_amount: data.total_amount,
            entretient: data.entretient
        });
        
        await client.save();

        res.status(200).send({ message: "client added succed !" })

    } catch (error) {
        res.status(400).send({ message: "please check up your added information"})
    }
});

app.get('/', async(req, res)=> {
    try {
        let clients = await Clients.find()
        res.status(200).send(clients)
    } catch (error) {
        res.status(400).send({ message: "Error fetching clients !", error: error })
    }

});

app.get('/:id', async (req, res) => {
    try {
      let clientId = req.params.id
  
      let client = await Clients.findOne({ _id: clientId })
  
      if (client)
        res.status(200).send(client)
      else
        res.status(404).send({ message: "Clients not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching clients !", error: error })
    }
  })
  
  app.patch('/:id', async (req, res) => {
    try {
      let clientId = req.params.id
      let data = req.body
  
      let client = await Clients.findOneAndUpdate({ _id: clientId }, data)
  
      if (client)
        res.status(200).send({ message: "Clients updated !" })
      else
        res.status(404).send({ message: "Clients not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching clients !", error: error })
    }
  
  })
  
  app.delete('/:id', async (req, res) => {
    try {
      let clientId = req.params.id
  
      let client = await Clients.findOneAndDelete({ _id: clientId })
  
      if (client)
        res.status(200).send({ message: "Clients deleted !" })
      else
        res.status(404).send({ message: "Clients not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching clients !", error: error })
    }
  })
  

  module.exports = app
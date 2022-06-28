const express = require("express");
const Stocks = require("../models/stock")
const app = express();
const { isAuthorized, isDircteur, isMagazinier, isCom, isRespoAPV } = require("./../middlewares/auth")

app.post('/', async(req, res) =>{
    try {
        let data = req.body;
        let stock = new Stocks({
            type: data.type,
            qte: data.qte,
            prix: data.prix,
        });
        
        await stock.save();

        res.status(200).send({ message: "stock added succed !" })

    } catch (error) {
        res.status(400).send({ message: "please check up your added information"})
    }
});

app.get('/', async(req, res)=> {
    try {
        let stocks = await Stocks.find()
        res.status(200).send(stocks)
    } catch (error) {
        res.status(400).send({ message: "Error fetching stocks !", error: error })
    }

});

app.get('/:id', async (req, res) => {
    try {
      let stockId = req.params.id
  
      let stock = await Stocks.findOne({ _id: stockId })
  
      if (stock)
        res.status(200).send(stock)
      else
        res.status(404).send({ message: "Stocks not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching stocks !", error: error })
    }
  })
  
  app.patch('/:id', async (req, res) => {
    try {
      let stockId = req.params.id
      let data = req.body
  
      let stock = await Stocks.findOneAndUpdate({ _id: stockId }, data)
  
      if (stock)
        res.status(200).send({ message: "Stocks updated !" })
      else
        res.status(404).send({ message: "Stocks not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching stocks !", error: error })
    }
  
  })
  
  app.delete('/:id',async (req, res) => {
    try {
      let stockId = req.params.id
  
      let stock = await Stocks.findOneAndDelete({ _id: stockId })
  
      if (stock)
        res.status(200).send({ message: "Stocks deleted !" })
      else
        res.status(404).send({ message: "Stocks not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "Error fetching stocks !", error: error })
    }
  })
  

  module.exports = app
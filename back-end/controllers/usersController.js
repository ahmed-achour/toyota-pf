const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require('./../models/user')

const app = express()


// register API
app.post('/', async (req, res) => {
    try {

      let data = req.body

      let user = new User({
        username: data.username,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
      });

      await user.save()
  
      res.status(201).send({ message: "user saved !" })
  
    } catch (error) {
      res.status(400).send({ message: "user not saved !", error: error })
    }
  
  });


  app.post('/login', async (req, res) => {
    try {
  
      let data = req.body
  
      let user = await User.findOne({ username: data.username })
  
      if (user) {
        let compare = bcrypt.compareSync(data.password, user.password)
  
        if (compare) {

          let dataToStoreInToken = {
            id: user._id
          }
  
          let myToken = jwt.sign(dataToStoreInToken, "SECRET")
  
          res.status(200).send({ token: myToken })
  
        }
        else
          res.status(404).send({ message: "User not found !" })
      }
      else
        res.status(404).send({ message: "User not found !" })
  
    } catch (error) {
      res.status(400).send({ message: "user cannot logged in !", error: error })
    }
  })
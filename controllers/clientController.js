const express = require("express");
const multer = require('multer')
const path = require('path');
const Clients = require("../models/clientAccount")
const app = express();
const { isAuthorized, isDircteur } = require("./../middlewares/auth")

// Set The Storage Engine
const storage = multer.diskStorage(
  {

    destination: './assets/images/client',

    filename: function (req, file, cb) {
      console.log(req.body.firstname)
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

app.post('/create_profile/:id' ,[isAuthorized, isDircteur, upload.single('picture')],async(req, res) =>{
    try {
        let data = req.body;
        let file = req.file
        let userID = req.params.id
        console.log(userID)
        let clientFind = await Clients.findOne({account:userID })
        let client = new Clients({
            firstname: data.firstname,
            lastname: data.lastname,
            photo: file.filename,
            model:data.model,
            email: data.email,
            total_amount: data.total_amount,
            entretient: data.entretient,
            account: userID
        });
        if (clientFind){
          error = "client already exists!"
          res.status(404).send({ message: "client already exists!" })
        }else {
          await client.save();
          res.status(200).send({ message: "client added succed !" })
         
        }


    } catch (error) {
        res.status(400).send({ message: "please check up your added information", error})
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

app.get('/:id',  async (req, res) => {
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
  
app.patch('/:id',[isAuthorized, isDircteur], async (req, res) => {
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
  
app.delete('/:id', [isAuthorized, isDircteur],async (req, res) => {
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
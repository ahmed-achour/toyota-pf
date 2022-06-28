const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./../models/user");

const { isAuthorized, isDircteur } = require("./../middlewares/auth");

const app = express();

// register API
app.post("/", async (req, res) => {
  try {
    // 1 - recupération des données mel front
    let data = req.body;
    //verfication terminal 
    console.log(req.body);
    // 2 - creation d'un objet User
    // 2.1 - data => user
    let user = new User({
      username: data.username,
      role: data.role,
      password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
    });
    let checkUser = await User.findOne({ username: data.username });
    // 3 - save lel objet
    // 4 - return result to front , result => 201 or 400
    if (checkUser) {
      res.status(400).send({ message: "user already exists !" });
    } else {
      await user.save();
      res.status(201).send({ message: "user saved !" });
    }
  } catch (error) {
    res.status(400).send({ message: "user not saved !", error: error });
  }
});

app.post("/login", async (req, res) => {
  try {
    let data = req.body;

    let user = await User.findOne({ username: data.username });

    if (user) {
      let compare = bcrypt.compareSync(data.password, user.password);

      if (compare) {
        // 1 - creation mta3 token
        // token => crypted string <= info
        let dataToStoreInToken = {
          id: user._id,
          role: user.role,
        };

        let myToken = jwt.sign(dataToStoreInToken, "SECRET");
        res.set("Access-Control-Expose-Headers", ["Authorization"]);
        res.set("Authorization", myToken);
        res.status(200).send({ message: "User Logged in !", myToken });
      } else res.status(404).send({ message: "User not found !" });
    } else res.status(404).send({ message: "User not found !" });
  } catch (error) {
    res.status(400).send({ message: "user cannot logged in !", error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: "Error fetching users !", error: error });
  }
});

app.get("/:id", async (req, res) => {
  try {
    let userId = req.params.id;

    let user = await User.findOne({ _id: userId });

    if (user) res.status(200).send(user);
    else res.status(404).send({ message: "User not found !" });
  } catch (error) {
    res.status(400).send({ message: "Error fetching users !", error: error });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    let data = req.body;

    if (data.hasOwnProperty("password")) {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
    }

    let user = await User.findOneAndUpdate({ _id: userId }, data);

    if (user) res.status(200).send({ message: "User updated !" });
    else res.status(404).send({ message: "User not found !" });
  } catch (error) {
    res.status(400).send({ message: "Error fetching users !", error: error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let userId = req.params.id;

    let user = await User.findOneAndDelete({ _id: userId });

    if (user) res.status(200).send({ message: "User deleted !" });
    else res.status(404).send({ message: "User not found !" });
  } catch (error) {
    res.status(400).send({ message: "Error fetching users !", error: error });
  }
});

module.exports = app;

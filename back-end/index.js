// import libs
const express = require("express")

// import database connection
const mongoose = require("./config/db")

// import controllers
const usersController = require("./controllers/usersController")

// creation d'un objet express .
const app = express();
const port = 3000

// autorisé les données de type JSON
app.use(express.json());

// router
app.use("/users", usersController);


app.get('/', (req,res) =>{
    res.send("hello world")
})

app.listen(port, ()=>{ console.log(`🟢 Server started on port ${port}`); })
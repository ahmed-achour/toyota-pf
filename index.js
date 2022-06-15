// import libs
const express = require("express")
const cors = require("cors")
// import database connection
const mongoose = require("./config/db")

// import controllers
const usersController = require("./controllers/usersController")
const papperController = require("./controllers/papperController")
const stockController = require("./controllers/stockController")
const clientController = require("./controllers/clientController")
const carsController = require("./controllers/carsController")


// creation d'un objet express .
const app = express();
const port = 3000


// autorisé les données de type JSON
app.use(express.json())
// autorisé les données de type files
app.use(express.urlencoded({
    extended: true
}));
// autorisé l'accee d'un serveur
app.use(cors())

// router
app.use("/users", usersController);
app.use("/client", clientController);
app.use("/stock", stockController);
app.use("/demande", papperController);
app.use("/cars", carsController);


app.get('/', (req,res) =>{
    res.send("hello world")
})

app.listen(port, ()=>{ console.log(`🟢 Server started on port ${port}`); })
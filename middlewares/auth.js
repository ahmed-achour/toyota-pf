const jwt = require("jsonwebtoken")

const isAuthorized = (req, res, next) => {

    try {
        let token = req.get("Authorization")
        let decodedToken = jwt.verify(token, "SECRET")
        //
        console.log(decodedToken);
        next()
    } catch (error) {
        res.status(400).send({ message: "Error fetching users !", error: error })
    }
}

const isDircteur = (req, res, next) => {

    try {
        let token = req.get("Authorization")
        let decodedToken = jwt.verify(token, "SECRET")
        if (decodedToken.role == "directeur"){
            console.log(decodedToken);
            next()
        }else {
            res.status(400).send({ message: "accesss denied", error: "accesss denied" })
        }

    } catch (error) {
        res.status(400).send({ message: "Error fetching users !", error: error })
    }
}

module.exports = { isAuthorized, isDircteur }
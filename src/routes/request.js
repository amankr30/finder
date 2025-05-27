const express = require("express");
const requestRouter = express.Router();

requestRouter.get('/getConnectionRequest', async (req, res) => {
    try{
        const user = req.body;
        res.send("Connection request for user: " + user.firstName);
    }catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports = requestRouter;
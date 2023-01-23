//import the required module
const express = require("express")
const router = express.Router()

const userController = require('./userController')

//This get method will get the user with token
router.get('/',(req,res)=>{
  try {    
    //retrive userdata from req claims
    const userdata = req.claims;
    if (!userdata.email) {
      res.send(400).send('user email is not available');
    }

    //Calling controller findUser method return the error or result
    userController.findUser(userdata.email,(err,result)=>{
        if(err) {
          res.status(400).send('error getting the user', err)
        }
        else {
          res.status(200).send(result);
        }
    })
  }
  catch {
    res.status(50).send({error: "unexpected error, try after sometime"}, err)
  }
})


module.exports = router
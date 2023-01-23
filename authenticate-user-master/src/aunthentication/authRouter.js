//import the modules that are required
const authController = require('./authController')

const express = require("express")
const router = express.Router()


//This method post will regiater the use
router.post('/register',(req,res)=>{
  //retrive name, email and password from request body
  try {

    const {name, email, password} = req.body;
    if (!(name, email, password)) {
            return res.status(400).send("Required inputs are missing")
    }
    const userDetails = {
      name, email, password
    }
    
    //calling authController registeruser method return the error msg or the result
    authController.registerUser(userDetails,(err,result)=>{
      if (err) {
        return res.status(400).send({error:'User Already Exists'});
      }
      else {
        res.status(201).send({STATUS:"OK",result});
      }

    })
  }
  catch (err) {
    res.status(500).send({error:"Unexpexted error while registering the user"});
  }
})

//This method post will login the user once they are registered
router.post('/login',(req,res)=>{
  try {
    //retrive email and password from req.body
    const { email, password } = req.body;
    if (!(email && password && password)) {
      return res.status(400).send('Require inputs are missing !');
    }
    //calling the authController login usermethod return the error or the result 
    authController.loginUser({email,password},(err,result)=>{
      if (err) {
        res.status(401).send({error: "Invalid credentials", err});
      }
      else {
        res.status(200).send({STATUS:"OK",result});
      }
    })
  }
  catch (err) {
    res.status(500).send({error:"Unexpexted error while registering the user"});
  }


})

module.exports = router
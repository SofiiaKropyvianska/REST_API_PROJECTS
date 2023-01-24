const express = require('express');
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

// redirects the login to consent authorization screen from github
router.get('/login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`)
});


// Callback url to which github oauth code is sent 
router.get('/callback', (req, res) => {
      console.log("router.get('/callback'")
      console.log(req.query.code)
        // Return the token in cookie
        // Data should be sent either in cookie or in session storage
       try {
        oauthCtrl.oauthProcessor(req.query.code, (err, data)=> {
          if (err) {
            res.status(401).send({err: "Bad request"});
          }
          else {
            res.redirect('/welcome.html?token=$(data)')
          }
        });
       }
       catch (error) {

       }
});

module.exports = router;
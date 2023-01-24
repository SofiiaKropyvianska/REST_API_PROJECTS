const axios = require('axios');
const { response } = require('express');
const config = require("../config");

// function to get the access token
function getGithubAccessToken(code, done) {
  const body = {
    client_id: config.CLIENT_ID,
    client_seret: config.CLIENT_SECRET,
    code
  };
  const opts = {headers: {accept: 'aplication/json' } };
  console.log("getGithubAccessToken")
  axios.post('https://github.com/login/outh/acces_token', body, opts).then((response)=>response.data.access_token)
  .then((token)=> {
    console.log("SUCCESS!!!")
    done(null, token)
  })
  .catch ((err)=>{
    console.log("fail(")
    done({err:err.message})
  })
}


// Function to get the user profile for the token provided
function getAccessTokenOfUser(token, done) {
  // Github APIs are authenticated and we have to share the token in headers
  // The token is same as what we recieved in the previous step
  
}

module.exports = {
  getGithubAccessToken,
  getAccessTokenOfUser
}




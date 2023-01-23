//import users.json file and fs module

const users = require('./users.json')
const fs = require('fs');
const { Console } = require('console');

//This method will findUser
function findUser(email,done) {
    fs.readFile('src/Users/users.json', (err, fileContent) => {
      if (err) {
        return done("Encountered error while getting users deteils");
      }
      const usersData = JSON.parse(fileContent);
      //use filter method to find the user from json file
      const userFetched = usersData.filter((user) => user.email === email)[0];
      done(undefined, userFetched)
    });
}

//This method will register user
function registerUser(userData,done){
  fs.readFile('src/Users/users.json', (err, fileContent) => {
    if (err) {
      return done("Encountered error while getting users deteils");
    }
    let usersData = JSON.parse(fileContent);
    let userExist = usersData.find(p => p.email === usersData.email);

    if (!userExist) {
      usersData.push(userData);

      //call fileWrite method and write the user in json file
      fs.writeFile('src/Users/users.json', JSON.stringify(usersData), (err, updatedContent) => {
        if (err) {
          return done("Encountered error while saiving deteils");
        }
        done(undefined, userData);
      })
    }
    else {
      return done("User already registered");
    }
  });
}

module.exports = {
    findUser,registerUser
}
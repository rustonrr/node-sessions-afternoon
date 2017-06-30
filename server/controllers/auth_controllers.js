const users = require("../models/users");

let id = 1;

module.exports = {
    login: (req, res, next) => {
        const {session} = req;
        const {username, password} = req.body;
        // look on the request body for a username and password
        const user = users.find(user => user.username === username && user.password === password); 
        // check to see if a user from users array matches user/pass combination
        if(user){
        //if method finds a user
            session.user.username = user.username;
            // update the value of username to the user's username on the request session user object
            res.status(200).send(session.user);
            //return a status of 200 with request session user object
        } else {
            res.status(500).send("WRONG");
            // return status of 500 (it doesnt say anything about a message in the instructions)
          }
    },
    register: (req, res, next) => {
        const {session} = req;
        const {username, password} = req.body;
        // look on the request body for a username and password
        users.push({
            id,
            username,
            password
        });
        //push an object with id, username, password to users array
        id++;
        //increment value of global id variable (so no users have same id)
        session.user.username = username;
        // update value of username on request session user object
        res.status(200).send(session.user);
        console.log(session.user);
        // send status of 200 with request session user object
    },

    signout: (req, res, next) => {
        const {session} = req;
        session.destroy();
        // i am not sure why this is not req.session.destroy();
        res.status(200).send(req.session);
        // send req.session as user should be undefined at this point
    },
    getUser: (req, res, next) => {
        const {session} = req;
        res.status(200).send(session.user)
        // send status of 200 along with request session user object
    },
}
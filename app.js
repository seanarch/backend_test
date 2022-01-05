const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express(); // parse the incoming data into object 

app.use(express.urlencoded({ extended: false }));

app.get('/currenttime', function (req, res) {
    res.send('<h1>' + new Date().toISOString() + '</h1>');
});  // localhost:3000/currenttime 


app.get('/', function (req, res) {
    res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>');
});  // localhost:3000/


app.post('/store-user', function (req, res) {
    const userName = req.body.username;

    console.log(userName);
    const filePath = path.join(__dirname, 'data', 'users.json');
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    existingUsers.push(userName);


    fs.writeFileSync(filePath, JSON.stringify(existingUsers));

    const newData = fs.readFileSync(filePath);
    const updatedUsers = JSON.parse(newData);

    res.send('<h1>Username stored!</h1><br><h2>' + 'Current users are ' + updatedUsers + '</h2>');


});

app.get('/users', function (req, res) {

    const filePath = path.join(__dirname, 'data', 'users.json');
    const newData = fs.readFileSync(filePath);
    const updatedUsers = JSON.parse(newData);

    res.send('Current users are ' + updatedUsers + '</h2>');


});



app.listen(3000);

// function handleRequest(request, response) {

//     if (request.url === '/currentime') {
//         response.statusCode = 200;
//         response.end('<h1>' + new Date().toISOString() + '</h1>');
//     } else if (request.url === '/') {
//         response.statusCode = 200;
//         response.end('<h1>Hello World!</h1>');
//     }

//     // localhost:3000/currenttime
//     // localhost:3000

// }

// const server = http.createServer(handleRequest);

// server.listen(3000);

// // amazon.com => Send request to Amazon's server
// // amazon.com:443 


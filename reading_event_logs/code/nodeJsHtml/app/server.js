console.log('Server-side code running');

const express = require('express');

const app = express();

// serve files from the public directory
app.use(express.static('public'));

// start the express web server listening on 8080
app.listen(8080, () => {
    console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//A button
app.post('/clicked', (req, res) => {
    console.log("Loading ");
    res.sendStatus(201);
});


app.post('/clicked2', (req, res) => {
    console.log("Clicked2");
    res.sendStatus(201);
});

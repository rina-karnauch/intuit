const express = require("express");

let bodyParser = require('body-parser');

const {getMoviesByDateAndName, getMoviesByComplexAndName, getTicketForMovie} = require("./movies");
const {validateTicket} = require('./tickets');

const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

// get where a movie screens and where
// output: movie and date
app.post('/getMovieOnDate', (req, res) => {
    var theaters = getMoviesByDateAndName(req.body.name, req.body.date);
    res.status(200).send(theaters);
});

// get movies in a complex in a given data
// input: complex, date
// output: list of movies that are screened in the complex

app.post('/getMoviesInComplexOnDate', (req, res) => {
    var moviesOnDate = getMoviesByComplexAndName(req.body.complex, req.body.movieDate);
    res.status(200).send(moviesOnDate)
});

// purchasing ticket api
// input: movie details, payment methods
// output: ticket

app.post('/getTicket', (req, res) => {
    var ticket = getTicketForMovie(req.body.name, req.body.complex, req.body.date, req.body.time, req.body.paymentMethod);
    if (!ticket) {
        res.status(500).send("No such movie at this complex or date/time");
    } else {
        // write new tickets inside json
        fs.readFile('ticketsDB.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
                app.status(500).send("error writing into ticketsDB");
            } else {
                obj = JSON.parse(data); //now it an object
                obj.table.push(ticket); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('ticketsDB.json', json, 'utf8', callback); // write it back
            }
        });
    }

});

// validating a ticket, determining that ticket is valid
// input: ticket
// output: true/false
app.post("/validateTicket", (req, res) => {
    var ticketValidity = validateTicket(req.body.barcode);
    if(!ticketValidity){
        app.status(200).send(true);
    }else{
        app.status(500).send(false);
    }


});

// opening serves
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
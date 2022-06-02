const moviesDB = require("./moviesDB.json");


function getMoviesByDateAndName(movieName, date) {
    var moviesDB = require('./moviesDB.json');
    var theaters = [];

    for (var i = 0; i < moviesDB.length; i++) {
        if (moviesDB[i].name === movieName && moviesDB[i].date === date && !(moviesDB[i].location in theaters)) {
            theaters.push(moviesDB[i].location);
        }
    }
    return theaters;
}

function getMoviesByComplexAndName(complex, date) {
    var moviesDB = require('./moviesDB.json');
    var movies = [];

    for (var i = 0; i < moviesDB.length; i++) {
        if (moviesDB[i].location === complex &&
            moviesDB[i].date === date &&
            !(moviesDB[i].name in movies)) {
            movies.push(moviesDB[i].name);
        }
    }
    return movies;
}

function getTicketForMovie(name, complex, date, time, paymentMethod) {
    var ticketsDB = require('./ticketsDB.json');

    function checkForMovie() {
        for (var i = 0; i < moviesDB.length; i++) {
            if (moviesDB[i].complex === complex &&
                moviesDB[i].date === date &&
                moviesDB[i].time === time) {
                return true;
            }
        }
        return false;
    }

    if (!checkForMovie()) {
        return null;
    } else {
        var newTicket = {
            "barcode": ticketsDB.length,
            "movie": name,
            "location": complex,
            "date": date,
            "time": time,
            "paymentMethod": paymentMethod,
            "validity": "true",
        }
        return newTicket;
    }

}

module.exports = {
    getMoviesByDateAndName: getMoviesByDateAndName,
    getMoviesByComplexAndName: getMoviesByComplexAndName,
    getTicketForMovie: getTicketForMovie
};
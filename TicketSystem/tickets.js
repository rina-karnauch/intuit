const moviesDB = require("./moviesDB.json");


function validateTicket(barcode) {
    var ticketsDB = require('./ticketsDB.json');
    for (var i = 0; i < moviesDB.length; i++) {
        if (ticketsDB[i].barcode === barcode) {
            return true;
        }
    }
    return false;
}


module.exports = {
    validateTicket: validateTicket,
};
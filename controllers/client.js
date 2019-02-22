// Load required packages
var Client = require('../models/client');

// Create endpoint /api/client for POST
exports.postClients = function(req, res) {
    // new instance
    var client = new Client();

    // Set the client info from the POST reqs
    client.name =  req.body.name,
    client.id = req.body.id,
    client.secret = req.body.secret,
    client.userId = req.user._id

    // Save thee client and check for errors
    client.save(function(err, client) {
        if (err)
            res.send(err)

        res.json({
            message: "Client added to the locker",
            data: client
        })
    })
}

// Create endpoint /api/client for GET
exports.getClients = function(req, res) {
    // Use Client model to find all clients from userId
    Client.find({ userId: req.user._id}, function(err, clients) {
        if (err)
            res.send(err)

        res.json(clients);
    })
}

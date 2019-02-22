var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost/beerlocker');

router.get('/', function(req, res) {
    res.json("Hold my beer.")
})

var beersRoute = router.route('/beers');

beersRoute.post(function(req, res) {
    var beer = new Beer();
    
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;

    beer.save(function(err) {
        if (err) {
            res.send(err);
        }

        res.json({ message: "New Beer for you", data: beer})
    })
})

beersRoute.get(function(req, res) {
    Beer.find(function(err, allBeers) {
        if(err)
            res.send(err);

        res.json(allBeers);
    })
})

app.use('/api', router);

const PORT = process.env.PORT || 3002
app.listen(PORT);
console.log('Waiting for beer at port ' + PORT)
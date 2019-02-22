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

router.get('/', (req, res) => {
    res.json("Hold my beer.")
})

var beersRoute = router.route('/beers');

beersRoute.post((req, res) => {
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

beersRoute.get((req, res) => {
    Beer.find((err, allBeers) => {
        if(err)
            res.send(err);

        res.json(allBeers);
    })
})

var beerRoute = router.route('/beers/:beer_id');

beerRoute.get((req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err)
            res.send(err)
        
        res.json(beer);
    })
})

beerRoute.put((req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if (err)
            res.send(err)

        beer.quantity = req.body.quantity;

        beer.save(err => {
            if (err)
                res.send(err)

            res.json(beer)
        })
    })
})

beerRoute.delete((req, res) => {
    Beer.findByIdAndDelete(req.params.beer_id, (err) => {
        if (err)
            res.send(err);

        res.json({ message: `Beer ${req.params.beer_id} removed from the locker.`})
    })
}) 

app.use('/api', router);

const PORT = process.env.PORT || 3002
app.listen(PORT);
console.log('Waiting for beer at port ' + PORT)
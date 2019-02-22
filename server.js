var express = require('express');

var app = express();

const PORT = process.env.PORT || 3002

var router = express.Router();

router.get('/', function(req, res) {
    res.json("Hold my beer.")
})

app.use('/api', router);

app.listen(PORT);
console.log('Waiting for beer at port ' + PORT)
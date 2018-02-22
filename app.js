const port = 8080;
const dbUrl = 'mongodb://localhost/mean_restaurants';

let express = require('express');
let app = express();
let mongoose = require('mongoose');
//mongoose.set('debug', true);

let bodyParser = require('body-parser');
let path = require('path');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));
mongoose.connect(dbUrl);

require('./routes')(app);

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./client/dist/index.html'));
});

app.listen(port, function() {
    console.log(`Its goin down on ${port} `);
});

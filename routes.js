const Restaurant = require('./restaurant');
const Review = require('./review');

module.exports = function(app) {
    app.get('/restaurants', function(req, res){
        Restaurant.find({}, function(err, data) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json(data);
            }
        });
    });

    app.post('/restaurants', function(req, res){
        var restaurant = new Restaurant({ name: req.body.name, cuisine: req.body.cuisine });
        restaurant.save(function(err, data) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json({success: data});
            }
        });
    });

    app.get('/restaurants/:id', function(req, res){
        Restaurant.findOne({_id: req.params.id})
            .populate('reviews')
            .exec(function(err, data) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json(data);
            }
        });
    });

    app.post('/restaurants/:id', function(req, res){
        Restaurant.findOne({_id: req.params.id}, function(err, restaurant) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                var review = new Review({name: req.body.name, stars: req.body.stars, text: req.body.text});
                review.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.json({error: err});
                    } else {
                        restaurant.reviews.push(review);
                        restaurant.save(function(err, results) {
                            res.json({success: results});
                        });
                    }
                });
            }
        });
    });

    app.put('/restaurants/:id', function(req, res){
        Restaurant.findOne({_id: req.params.id}, function(err, restaurant) {
            if (err) {
                res.json({error: err});
            } else {
                if (req.body.name !== restaurant.name) { restaurant.name = req.body.name }
                if (req.body.cuisine !== restaurant.cuisine) { restaurant.cuisine = req.body.cuisine }
                restaurant.save(function(err, results) {
                    if (err) {
                        res.json({error: err});
                    } else {
                        res.json({success: results});
                    }
                });
            }
        });
    });

    app.delete('/restaurants/:id', function(req, res) {
        Restaurant.findByIdAndRemove(req.params.id, function(err, results) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json({success: results});
            }
        });
    });
}

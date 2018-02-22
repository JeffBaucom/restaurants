let mongoose = require('mongoose');

let RestaurantSchema = new mongoose.Schema({
    name: {required: true, type: String, minlength: 3},
    cuisine: {required: true, type: String, minlength: 3},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
}, {timestamps: true});
RestaurantSchema.pre('remove', function(next) {
    this.model('Review').remove({ _restaurant: this._id }, next);
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);

let mongoose = require('mongoose');

let ReviewSchema = new mongoose.Schema({
    stars: {required: true, type: Number, min: 1, max: 5},
    text: {required: true, type: String, minlength: 3},
    name: {required: true, type: String, minlength: 3},
    _restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}
}, {timestamps: true});

module.exports = mongoose.model('Review', ReviewSchema);

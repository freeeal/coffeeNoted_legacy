// Creating Mongoose models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoffeeSchema = new Schema({

    coffeeName: {
    	type: String,
    	trim: true
    },
    authorName: String,
    notes: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'Note'
    }],
    imageUrl: String

});

CoffeeSchema.set('toJSON', { getters: true });

// export Coffee model
module.exports = mongoose.model('Coffee', CoffeeSchema);
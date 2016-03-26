// Creating Mongoose models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoffeeSchema = new Schema({

    // id: Schema.Types.ObjectId,
    coffeeName: {
    	type: String,
    	trim: true
    },
    roaster: String,
    producer: String,
    region: String,
    elevation: String,
    varietals: String,
    harvest: String,
    process: String,
    notes: [{
        author: String,
        text: String,
    	date: { type: Date, default: Date.now }
    }]

});

CoffeeSchema.set('toJSON', { getters: true });

// export Coffee model
module.exports = mongoose.model('Coffee', CoffeeSchema);
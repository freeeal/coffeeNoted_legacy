// Creating Mongoose models
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({

    coffee: {
        type: Schema.Types.ObjectId, 
        ref: 'Coffee'
    },
    author: {
    	type: Schema.Types.ObjectId,
    	ref: 'User'
    },
    text: String,
    datePublished: {
        type: Date, 
        default: Date.now
    }

});

NoteSchema.set('toJSON', { getters: true });

// export Note model
module.exports = mongoose.model('Note', NoteSchema); 
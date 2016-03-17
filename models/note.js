// // Creating Mongoose models
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var NoteSchema = new Schema({

//     coffeeName: {
//         type: String,
//         trim: true
//     },
//     noteId: Schema.Types.ObjectId,
//     reviewer: String,
//     reviewBody: String,
//     datePublished: {
//         type: Date, 
//         default: Date.now
//     }

// });

// NoteSchema.set('toJSON', { getters: true });

// // export Note model
// module.exports = mongoose.model('Note', NoteSchema); 
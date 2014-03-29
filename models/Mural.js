var Mongoose = require('mongoose');

exports.MuralSchema = new Mongoose.Schema({
	stanza : { type : [String], required : true },
    life : { type : [Number], required : true },
    empty : { type : [Boolean], required : true }
 });


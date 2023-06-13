const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	comment: {
		type: String,
		required: true
	},
	commentedBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	date: {
		type: String,
		required: true
	},
	recipe: {
		type: mongoose.Schema.ObjectId,
		ref: 'Recipe',
		required: true
	},
	edited: {
		type: Boolean,
		required: true,
		default: false
	}
});

commentSchema.index({ recipe: 1 });
commentSchema.index({ commentedBy: 1 });

module.exports = mongoose.model('Comment', commentSchema);

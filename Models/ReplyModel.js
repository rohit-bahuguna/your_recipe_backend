const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
	reply: {
		type: String,
		required: true
	},
	replyedBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	date: {
		type: String,
		required: true
	},
	replyedOn: {
		type: mongoose.Schema.ObjectId,
		ref: 'Comment',
		required: true
	},
	edited: {
		type: Boolean,
		required: true,
		default: false
	}
});

replySchema.index({ replyedBy: 1 });
replySchema.index({ replyedOn: 1 });
module.exports = mongoose.model('Reply', replySchema);

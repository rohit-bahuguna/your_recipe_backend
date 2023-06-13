const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		verified: {
			type: Boolean,
			required: true,
			default: false
		},
		phoneNumber: {
			type: Number,
			maxLength: 10
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		bio: {
			type: String,
			maxLength: 20
		},
		profilePicture: {
			type: String,
			required: true,
			default:
				'https://res.cloudinary.com/dfbd4lyqe/image/upload/v1662800728/users/dumy/sampleImage_qroybc.png'
		},
		gender: {
			type: String
		},
		favorites: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Recipe'
			}
		],
		followers: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'User'
			}
		],
		following: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'User'
			}
		]
	},
	{ timestamps: true }
);

userSchema.index({ email: 1 });

// hash password before saving to db

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// check for users password

userSchema.methods.ispasswordValid = async function(passwordFromUser) {
	return await bcrypt.compare(passwordFromUser, this.password);
};

// generate user password

userSchema.methods.getJwtToken = function(expiresIn) {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn });
};

module.exports = mongoose.model('User', userSchema);

// username: {
// 	type: String,
// 	require: true
// },

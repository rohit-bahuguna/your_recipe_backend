const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { promisifyAll } = require('bluebird');
const redis = promisifyAll(require('redis'));
const Queue = require('bull');

const {
	env: {
		CLOUDEINARY_API_KEY,
		CLOUDEINARY_API_SECRET,
		CLOUDEINARY_CLOUD_NAME,
		REDIS_URL
	}
} = require('process');

// mongoDB config

mongoose.set('strictQuery', false);
exports.connectToDB = () => {
	mongoose.connect(process.env.MONGO_URL).then(() => {
		console.log('mongoDb Connected');
	});
};

// cloudinary config

exports.cloudinaryConfig = () => {
	cloudinary.config({
		cloud_name: CLOUDEINARY_CLOUD_NAME,
		api_key: CLOUDEINARY_API_KEY,
		api_secret: CLOUDEINARY_API_SECRET
	});
};

// redis config

exports.client = redis.createClient({
	url: REDIS_URL
});

// bull config
// Initiating the Queue with a redis instance

exports.mailQueue = new Queue('sendMail', REDIS_URL);

exports.scheduleMailQueue = new Queue('sendScheduleMail', REDIS_URL);

const { scheduleMailQueue } = require('../Config/Config');

exports.addToQueue = (To, subject, html, delay) => {
	scheduleMailQueue.add(
		{ email: To, subject, html },
		{
			delay: delay,
			attempts: 4
		}
	);
};

const { sendMail } = require('../Utils/sendEmail');
const { scheduleMailQueue } = require('../Config/Config');

exports.scheduleMail = () => {
	scheduleMailQueue.process(async (jobs, done) => {
		const { email, subject, html } = jobs.data;

		await sendMail(email, subject, html);

		done();
	});
};

scheduleMailQueue.on('completed', job => {
	console.log('completed ', job.id);
});
scheduleMailQueue.on('active', job => {
	console.log('active ', job.id);
});

const { verificationMesage } = require('../helpers/verificationMessage');

const { mailQueue } = require('../Config/Config');
const { sendMail } = require('../Utils/sendEmail');

exports.sendAMail = () => {
	mailQueue.process(async (jobs, done) => {
		const { email, name, token } = jobs.data;

		const verificationUrl = `${process.env.ORIGIN}/verify/${token}`;

		const html = verificationMesage(name, verificationUrl);

		await sendMail(email, 'Account Verification', html);

		done();
	});
};

mailQueue.on('completed', job => {
	console.log('completed ', job.id);
});

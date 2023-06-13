const { addToQueue } = require('../helpers/addMailToQueue');
const { createMailBody } = require('../helpers/verificationMessage');

exports.scheduleMail = async (req, res) => {
	try {
		const { message, subject, To, date, time } = req.body;
		const delay = Date.parse(`${date} ${time}`) - Date.parse(new Date());
		const html = createMailBody(message);
		addToQueue(To, subject, html, delay);
		res.status(200).json({
			success: true,
			message: `mail schedule for ${date} ${time} to ${To}`
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.sendBulkMail = async (req, res) => {
	try {
		const { emails } = req.data;

		let delay = 0;
		let successMessage = 'mail sent successfully';
		const { message, subject, schedulemail } = req.body;

		if (schedulemail === true) {
			delay =
				Date.parse(`${req.body.date} ${req.body.time}`) -
				Date.parse(new Date());

			successMessage = `mail scheduled successfully for ${req.body
				.date} at ${req.body.time} `;
		}

		const html = createMailBody(message);

		for (let i = 0; i < emails.length; i++) {
			addToQueue(emails[i], subject, html, delay);
		}

		res.status(200).json({
			success: true,
			message: successMessage
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

const {
	env: {
		CLIENT_ID,
		CLIENT_SECRET,
		REDIRECT_URL,
		REFRESH_TOKEN,
		SMTP_USER,
		SMPT_PASS
	}
} = require('process');

const nodemailer = require('nodemailer');
const google = require('googleapis').google;

exports.sendMail = async (email, subject, html) => {
	try {
		const oauth2Client = new google.auth.OAuth2(
			CLIENT_ID,
			CLIENT_SECRET,
			REDIRECT_URL
		);

		const ASCESS_TOKEN = oauth2Client.getAccessToken((err, token) => {});

		const transport = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: 'e94482c37ebbf9',
				pass: 'c625a4892d1955'
			}
		});

		// const transport = nodemailer.createTransport({
		// 	service: 'gmail',
		// 	host: 'smtp.gmail.com',
		// 	port: 465,
		// 	secure: true,
		// 	auth: {
		// 		type: 'OAuth2',
		// 		user: SMTP_USER,
		// 		pass: SMPT_PASS,
		// 		clientId: CLIENT_ID,
		// 		clientSecret: CLIENT_SECRET,
		// 		refreshToken: REFRESH_TOKEN,
		// 		accessToken: ASCESS_TOKEN
		// 	}
		// });

		const info = await transport.sendMail({
			from: SMTP_USER,
			to: email,
			subject: subject,
			html: html
		});

		return info;
	} catch (error) {
		console.log(error);
	}
};

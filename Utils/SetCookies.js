const userModel = require('../Models/UserModel');

const setCookies = (res, user, message) => {
	const token = user.getJwtToken(process.env.JWT_EXPIRY);
	const cookieOptions = {
		httpOnly: true,
		expires: new Date(
			Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
		)
	};
	res.status(200).cookie('token', token, cookieOptions).json({
		success: true,
		message,
		user
	});
};

module.exports = setCookies;

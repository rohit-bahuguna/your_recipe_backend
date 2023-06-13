const jwt = require('jsonwebtoken');
const userModel = require('../Models/UserModel');

exports.isUserLoggedIn = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await userModel.findOne({ _id: decoded.id });
		next();
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

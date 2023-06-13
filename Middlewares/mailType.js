const userModel = require('../Models/UserModel');
const csv = require('csvtojson/v2');

exports.checkMailType = async (req, res, next) => {
	try {
		const { type, emails } = req.body;

		let data = [];
		if (req.files && type === 'csv') {
			const jsonArray = await csv().fromFile(req.files.file.tempFilePath);
			for (let i = 0; i < jsonArray.length; i++) {
				data = [...data, jsonArray[i].email];
			}
		} else if (type === 'mannuly') {
			data = [...emails];
		} else {
			const usersMail = await userModel.aggregate([
				{
					$group: {
						_id: null,
						emails: { $push: '$email' }
					}
				}
			]);

			data = [...usersMail[0].emails];
		}

		req.data = { emails: data };
		next();
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

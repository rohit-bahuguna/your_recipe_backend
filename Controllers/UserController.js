const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const userModel = require('../Models/UserModel');
const { mailQueue } = require('../Config/Config')
const setCookies = require('../Utils/SetCookies');

exports.signUp = async (req, res) => {
	try {
		{
			const { name, email, password } = req.body;
			if ((!name, !email, !password)) {
				throw new Error('all fields are required');
			}
			const isUserExist = await userModel.findOne({ email });

			if (isUserExist) {
				throw new Error('this email id is already registered');
			}
			const newUser = new userModel({
				name,
				email,
				password
			});
			const response = await userModel.create(newUser);

			//	sending mail to user
			const token = response.getJwtToken(process.env.JWT_EXPIRY);
			mailQueue.add({ email: response.email, name, token })



			// sending response back
			setCookies(res, response, 'Account Created Successfully');
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.logIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		if ((!email, !password)) {
			throw new Error('all fields are required');
		}

		const user = await userModel.findOne({ email }).select('+password');

		if (!user) {
			throw new Error('Email id does not exist ');
		}

		const ispasswordValid = await user.ispasswordValid(password);
		if (!ispasswordValid) {
			throw new Error('Invalid Password');
		}
		user.password = undefined;
		setCookies(res, user, 'welcome ');
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.logOut = async (req, res) => {
	try {
		res.status(200).cookie('token', null).json({
			success: true,
			message: 'logOut successfully'
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.follow = async (req, res) => {
	try {
		const { id } = req.user; // user who is following
		const { userId } = req.params; // user who is getting followed by above user
		if (id === userId) {
			throw new Error('user can not follow to itself');
		}
		const userToFollow = await userModel.findOne({ _id: userId });

		let message;
		//	console.log(userToFollow.followers.includes(id), userToFollow);
		if (userToFollow.followers.includes(id)) {
			//unfollow //

			await userModel.findByIdAndUpdate(
				{ _id: userId },
				{ $pull: { followers: id } },
				{ new: true }
			);

			await userModel.findByIdAndUpdate(
				{ _id: id },
				{ $pull: { following: userId } },
				{ new: true }
			);
			message = 'unFollowed';
		} else {
			//follow

			//ading one person in own account whome i am following
			await userModel.findByIdAndUpdate(
				{ _id: id },
				{ $push: { following: userId } },
				{ new: true }
			);
			//adding one follower in followed persons accounts
			await userModel.findByIdAndUpdate(
				{ _id: userId },
				{ $push: { followers: id } }
			);
			message = 'Following';
		}
		res.status(200).json({
			success: true,
			message: message
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.editProfile = async (req, res) => {
	try {
		const { id } = req.user;
		const { name, bio, phoneNumber, gender } = req.body;
		if ((!name, !bio, !phoneNumber, !gender)) {
			throw new Error('all fields are required');
		}
		const updatedUser = await userModel.findByIdAndUpdate(
			{ _id: id },
			{ name, bio, phoneNumber, gender },
			{ new: true }
		);

		res.status(200).json({
			success: true,
			mesage: 'profile updated successfully',
			user: updatedUser
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			mesage: error.message
		});
	}
};

exports.editProfilePicture = async (req, res) => {
	try {
		const { id } = req.user;

		const profilePicture = await cloudinary.uploader.upload(
			req.files.profilePicture.tempFilePath,
			{
				folder: 'Recipe/users'
			}
		);

		const updatedUserProfile = await userModel.findByIdAndUpdate(
			{ _id: id },
			{ profilePicture: profilePicture.secure_url },
			{
				new: true
			}
		);

		res.status(200).json({
			success: true,
			message: 'user profile changed successfully',
			user: updatedUserProfile
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.verifyUser = async (req, res) => {
	try {
		const { token } = req.params;

		if (!token) {
			throw new Error('');
		}
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const user = await userModel
			.findOne({ _id: decodedToken.id })
			.select('+password');

		if (!user) {
			throw new Error('user does not exist');
		}

		user.verified = true;

		await user.save();

		res.status(200).json({ success: true, message: 'Account Verified' });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

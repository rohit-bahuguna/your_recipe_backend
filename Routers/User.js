const express = require('express');
const {
	signUp,
	logIn,
	logOut,
	follow,
	editProfile,
	editProfilePicture,
	verifyUser
} = require('../Controllers/UserController');
const { isUserLoggedIn } = require('../Middlewares/auth');
const userRouter = express.Router();

userRouter.route('/signup').post(signUp);

userRouter.route('/login').post(logIn);

userRouter.route('/logout').get(logOut);

userRouter.route('/follow/:userId').put(isUserLoggedIn, follow);

userRouter.route('/editprofile').put(isUserLoggedIn, editProfile);

userRouter.route('/editprofilepicture').put(isUserLoggedIn, editProfilePicture);


userRouter.route('/verify/:token').get( isUserLoggedIn ,  verifyUser)
module.exports = userRouter;

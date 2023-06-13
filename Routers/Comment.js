const express = require('express');
const {
	commentonRecipe,
	getAllCommentsOfArecipe,
	deleteComment,
	editComment
} = require('../Controllers/CommentController');
const { isUserLoggedIn } = require('../Middlewares/auth');
const commentRouter = express.Router();

commentRouter.route('/comment/:recipeId').post(isUserLoggedIn, commentonRecipe);

commentRouter.route('/getallcomments/:recipeId').get(getAllCommentsOfArecipe);

commentRouter
	.route('/deletecomment/:commentId')
	.delete(isUserLoggedIn, deleteComment);

commentRouter.route('/editcomment/:commentId').put(isUserLoggedIn, editComment);

module.exports = commentRouter;

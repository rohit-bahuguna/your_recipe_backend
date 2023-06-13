const express = require('express');

const {
	replyOnAcomment,
	editReply,
	deleteReply,
	getAllReplyOfAcomment
} = require('../Controllers/ReplyController');

const { isUserLoggedIn } = require('../Middlewares/auth');

const replyRouter = express.Router();

replyRouter.route('/reply/:commentId').post(isUserLoggedIn, replyOnAcomment);

replyRouter
	.route('/getallreplys/:commentId')
	.get(isUserLoggedIn, getAllReplyOfAcomment);

replyRouter.route('/deletereply/:replyId').delete(isUserLoggedIn, deleteReply);

replyRouter.route('/editreply/:replyId').put(isUserLoggedIn, editReply);

module.exports = replyRouter;

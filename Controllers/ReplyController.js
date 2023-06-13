const replyModel = require('../Models/ReplyModel');
const {getOrSetCache} = require('../Utils/GetOrSetCache')

exports.replyOnAcomment = async (req, res) => {
	try {
		const { id } = req.user;
		const { commentId } = req.params;
		const { reply } = req.body;

		const newReply = await replyModel.create({
			reply,
			replyedBy: id,
			date: new Date(),

			replyedOn: commentId
		});

		res.status(200).json({
			success: true,
			message: 'commented successfully',
			reply: newReply
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.getAllReplyOfAcomment = async (req, res) => {
	try {
		const { commentId } = req.params;
		const replies = await getOrSetCache(`reply${commentId}`, async () => {
			return await replyModel.find({ replyedOn: commentId });
		})
			
		res.status(200).json({
			success: true,
			replies
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.deleteReply = async (req, res) => {
	try {
		const { replyId } = req.params;
		const { id } = req.user;

		const deletedReply = await replyModel.findOneAndDelete({
			_id: replyId,
			replyedBy: id
		});
		if (deletedReply === null) {
			throw new Error('you are not allowed to delete this message');
		}
		res.status(200).json({
			success: true,
			message: 'comment deleted successfully',
			deletedReply
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.editReply = async (req, res) => {
	try {
		const { id } = req.user;
		const { replyId } = req.params;
		const { reply } = req.body;

		const updatedReply = await replyModel.findOneAndUpdate(
			{ _id: replyId, replyedBy: id },
			{ reply, edited: true },
			{
				new: true
			}
		);
		if (updatedReply === null) {
			throw new Error('you are not allowed to edit this message');
		}

		res.status(200).json({
			success: true,
			message: 'comment updated successfully',
			updatedReply
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

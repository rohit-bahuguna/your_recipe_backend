const express = require('express');

const { scheduleMail, sendBulkMail } = require('../Controllers/MailController');
const { checkMailType } = require('../Middlewares/mailType');

const mailRouter = express.Router();

mailRouter.route('/send').post(scheduleMail);

mailRouter.route('/sendbulk').post(checkMailType, sendBulkMail);

module.exports = mailRouter;

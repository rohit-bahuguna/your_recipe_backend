const { sendAMail } = require('./EmailService');
const { scheduleMail } = require('./ScheduleMail');

sendAMail();
scheduleMail();

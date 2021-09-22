const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {
    variables: { NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD, FRONTEND_URL },
    statusCodes,
    errorMessage
} = require('../config');
const emailTemplates = require('../email-template');
const ErrorHandler = require('../errors/ErrorHandler');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-template')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(statusCodes.INTERNAL_SERVER_ERROR, errorMessage.WRONG_TEMPLATE_NAME);
    }

    const { templateName, subject } = templateInfo;

    context.FRONTEND_URL = FRONTEND_URL;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};

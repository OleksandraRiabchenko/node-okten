const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const variables = require('../config/variables');
const allTemplates = require('../email-templates');
const ErrorHandler = require('../errors/ErrorHandler');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    // мають бути значення host і port провайдера пошти (gmail, outlook etc.), заміняємо на service gmail
    service: 'gmail',
    auth: {
        user: variables.NO_REPLY_EMAIL,
        pass: variables.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];
    console.log(JSON.stringify(allTemplates, null, 2));
    console.log(emailAction);

    if (!templateInfo) {
        throw new ErrorHandler(500, 'wrong template name');
    }
    console.log(templateInfo);

    const { templateName, subject } = templateInfo;
    // context = { ...context, FRONTEND_URL: variables.FRONTEND_URL };
    context.FRONTEND_URL = variables.FRONTEND_URL;

    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject,
        // html: html так писати не ок, тому пишемо скорочено, аналогічно з subject
        html
    });
};

module.exports = {
    sendMail
};

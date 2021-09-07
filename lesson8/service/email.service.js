const nodemailer = require('nodemailer');

const variables = require('../config/variables');

const sendMail = (userMail) => {
    const transporter = nodemailer.createTransport({
        // має бути значення host і port провайдера пошти (gmail, outlook etc.), заміняємо на service gmail
        service: 'gmail',
        auth: {
            user: variables.NO_REPLY_EMAIL,
            pass: variables.NO_REPLY_EMAIL_PASSWORD
        }
    });

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: 'hello world',
        html: ' <h1>HELLO WORLD EMAIL</h1>'
    });
};

module.exports = {
    sendMail
};

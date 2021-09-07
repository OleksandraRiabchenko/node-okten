const { emailActionsEnum } = require('../config');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'WELCOME !!!'
    },
    [emailActionsEnum.USER_BLOCKED_ADMIN]: {
        templateName: 'account blocked Admin',
        subject: 'Oops, you was blocked'
    },
    [emailActionsEnum.USER_BLOCKED_SOFT]: {
        templateName: 'account blocked soft',
        subject: 'Oops, you was blocked'
    },
};

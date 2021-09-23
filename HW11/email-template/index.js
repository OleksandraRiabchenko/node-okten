const { emailActions } = require('../config');

module.exports = {
    [emailActions.AUTH]: {
        templateName: 'auth',
        subject: 'You logged in account'
    },
    [emailActions.CREATE]: {
        templateName: 'create',
        subject: 'Welcome!'
    },
    [emailActions.DELETED_BY_USER]: {
        templateName: 'deleted',
        subject: 'You deleted your account'
    },
    [emailActions.DELETED_BY_ADMIN]: {
        templateName: 'deletedByAdmin',
        subject: 'Your account deleted by admin'
    },
    [emailActions.FORGOT_PASSWORD]: {
        templateName: 'forgot_password',
        subject: 'Forgot your password?'
    },
    [emailActions.LAST_ACTIVITY]: {
        templateName: 'last_activity',
        subject: 'Your last activity was 10 days ago'
    },
    [emailActions.UPDATE]: {
        templateName: 'update',
        subject: 'Your account updated'
    }
};

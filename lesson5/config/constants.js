module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
};

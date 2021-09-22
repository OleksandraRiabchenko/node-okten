module.exports = {
    userNormalizator: (userToNormalize) => {
        const fieldsToRemove = ['password'];

        userToNormalize = userToNormalize.toJSON();

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};

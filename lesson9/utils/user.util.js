module.exports = {
    userNormalizator: (userToNormalize) => {
        const fieldsToRemove = ['password'];

        // toJSON() замість lean() перетворює об'єкт монги в json-об'єкт
        userToNormalize = userToNormalize.toJSON();

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });
        return userToNormalize;
    }
};

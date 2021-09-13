const { Schema, model } = require('mongoose');

const userRolesEnam = require('../config/user-roles.enum');
const { USER } = require('../config/dbTables.enum');
const { passwordService } = require('../service');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // todo щоб не відображався пароль
        // select: false
    },
    role: {
        type: String,
        default: userRolesEnam.USER,
        enum: Object.values(userRolesEnam)
    },
    avatar: {
        type: String
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
// toObject: {virtuals: true}, toJSON: {virtuals: true}
// - якщо цього не записати, об'єкт Монго не перетвориться в JSON-формат і ці віртуальні поля на респонс не повернуться

// віртуальні поля(те чого немає по дефолту, вони не заносяться в базу, але ми можемо це повертати): this - це record in DB
// використовуємо не стрілочеу ф-цію, тому що інакше this - буде глобальним, а не локальним
userSchema.virtual('fullName').get(function getFullName() {
    return `${this.name} Movchun`;
});

// methods and statics in Mongoose
// methods не працюють з pojo-object, lean()/toObject/toJSON не дадуть використати методи, працює тільки з документами монго
userSchema.methods = { // use for single record // THIS - RECORD DB
    method() {
        console.log(this);
        console.log('USING MONGO METHOD');
    },

    comparePassword(password) {
        return passwordService.compare(this.password, password);
    }
};

// statics застосовуються до цілої схеми, а не до окремого запису (рекорду)
userSchema.statics = { // for schema// THIS - SHEMA
    testStatic() {
        console.log('HELLO TEST STATIC');
    },

    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hashPassword(userObject.password);

        return this.create({ ...userObject, password: hashedPassword });
    }
};

module.exports = model(USER, userSchema);

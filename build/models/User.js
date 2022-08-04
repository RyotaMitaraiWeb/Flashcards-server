import { __awaiter } from "tslib";
import pkg from 'mongoose';
const { Schema, model, Types } = pkg;
import userService from '../services/user.js';
import Preference from './Preference.js';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Потребителското име е задължилтено'],
        minlength: [5, 'Потребителското име трябва да съдържа между 5 и 15 символи'],
        maxlength: [15, 'Потребителското име трябва да съдържа между 5 и 15 символи'],
        trim: true,
        validate: {
            validator(value) {
                return /[a-z][a-z0-9]+/i.test(value);
            },
            message: 'Потребителското може да съдържа само латински букви и цифри и трябва да започва с буква'
        },
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Паролата е задължилтена'],
        minlength: [6, 'Паролата трябва да е поне 6 символа'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Имейлът е задължилтено'],
        validate: {
            validator(value) {
                return /^.*?@.*?\..*?$/.test(value);
            },
            message: 'Имейлът е в невалиден формат'
        },
        unique: true,
    },
    decks: [
        {
            type: Types.ObjectId,
            ref: 'Deck',
        },
    ],
    preferences: {
        type: Types.ObjectId,
        ref: 'Preference',
    },
});
userSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const username = yield userService.findUserByUsername(user.username);
        if (username !== null) {
            user.invalidate('username', 'Потребителското име е заето');
        }
        const email = yield userService.findUserByEmail(user.email);
        if (email !== null) {
            user.invalidate('email', 'Имейлът е зает');
        }
        next();
    });
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        try {
            const hashedPassword = yield bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            const preferences = new Preference({
                user: user._id,
                theme: 'light',
                colorTheme: 'purple',
                animation: 'vertical',
            });
            console.log(preferences);
            yield preferences.save();
            user.preferences = preferences._id;
            return next();
        }
        catch (err) {
            console.log(err.message);
            return next(err);
        }
    });
});
const User = model('User', userSchema);
export default User;

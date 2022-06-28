import { __awaiter } from "tslib";
import { Schema, model, Types } from 'mongoose';
import userService from '../services/user';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    username: {
        type: String,
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
        minlength: [6, 'Паролата трябва да е поне 6 символа']
    },
    email: {
        type: String,
        trim: true,
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
    profilePicture: {
        type: String,
        default: '',
    },
    preferences: {
        type: Types.ObjectId,
        ref: 'Preference',
    },
});
const User = model('User', userSchema);
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
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
export default User;

import { Schema, model, Types, Document } from 'mongoose';
import userService from '../services/user';
import bcrypt from 'bcrypt';

const userSchema: Schema<Document> = new Schema({
    username: {
        type: String,
        minlength: [5, 'Потребителското име трябва да съдържа между 5 и 15 символи'],
        maxlength: [15, 'Потребителското име трябва да съдържа между 5 и 15 символи'],
        trim: true,
        validate: {
            validator(value: string): boolean {
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
            validator(value: string): boolean {
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

const User = model<Document>('User', userSchema);

userSchema.pre('validate', async function (next) {
    const user: any = this;
    const username: Document | null = await userService.findUserByUsername(user.username);

    if (username !== null) {
        user.invalidate('username', 'Потребителското име е заето');
    }

    const email: Document | null = await userService.findUserByEmail(user.email);

    if (email !== null) {
        user.invalidate('email', 'Имейлът е зает');
    }

    next();
});

userSchema.pre('save', async function (next) {
    const user: any = this;
    if (!user.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        return next();
    } catch (err: any) {
        return next(err);
    }
})


export default User;
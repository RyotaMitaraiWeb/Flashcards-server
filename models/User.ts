import { Schema, model, Types } from 'mongoose';
// import bcrypt from 'bcrypt';

const userSchema: Schema = new Schema({
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

})

const User = model('User', userSchema);
export default User;
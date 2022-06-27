import { Schema, model, Types } from 'mongoose';
import { body, ValidationChain } from 'express-validator';
// import bcrypt from 'bcrypt';

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, 'Потребителското име е задължително'],
        minlength: [5, 'Потребителското име трябва да съдържа между 5 и 15 символи'],
        maxlength: [15, 'Потребителското име трябва да съдържа между 5 и 15 символи'],
        trim: true,
        validate: {
            validator(value: string): boolean {
                return /[a-z][a-z0-9]+/i.test(value);
            },
            message: 'Потребителското може да съдържа само латински букви и цифри и трябва да започва с буква'
        },
    },
    password: {
        type: String,
        required: [true, 'Паролата е задължителна'],
        trim: true,
        minlength: [6, 'Паролата трябва да е поне 6 символа']
    },
    email: {
        type: String,
        required: [true, 'Имейлът е задължителен'],
        trim: true,
        validate: {
            validator(value: string): boolean {
                return /^.*?@.*?\..*?$/.test(value);
            },
            message: 'Имейлът е невалиден'
        }
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
    }

})

const User = model('User', userSchema);
export default User;
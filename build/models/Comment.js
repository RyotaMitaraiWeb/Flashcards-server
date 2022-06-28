import { Schema, model, Types } from 'mongoose';
const commentSchema = new Schema({
    content: {
        type: String,
        minlength: [10, 'Съдържанието трябва да е между 10 и 100'],
        maxlength: [100, 'Съдържанието трябва да е между 10 и 100'],
        trim: true,
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Авторът липсва'],
    },
});
const Comment = model('Comment', commentSchema);
export default Comment;

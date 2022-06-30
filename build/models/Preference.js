import pkg from 'mongoose';
const { Schema, model, Types } = pkg;
const preferenceSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Потребителят липсва'],
    },
    animation: {
        type: String,
        enum: {
            values: ['vertical', 'horizontal', 'minimal', 'none'],
            messsage: 'Анимацията е невалидна',
        },
        default: 'vertical',
    },
    theme: {
        type: String,
        enum: {
            values: ['light', 'dark'],
            message: 'Невалиден режим'
        },
        value: 'light',
    },
    colorTheme: {
        type: String,
        enum: {
            values: ['purple', 'blue', 'green', 'pink', 'brown'],
            message: 'Невалиден цветен режим'
        },
    },
});
const Preference = model('Preference', preferenceSchema);
export default Preference;

import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const flashcardSchema = new Schema({
    front: {
        type: String,
        trim: true,
        maxlength: [75, 'Предната част не може да бъде повече от 75 символа'],
        default: '',
    },
    back: {
        type: String,
        maxlength: [75, 'Предната част не може да бъде повече от 75 символа'],
        trim: true,
        default: ''
    },
});
const Flashcard = model('Flashcard', flashcardSchema);
export default Flashcard;

import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const flashcardSchema: mongoose.Schema = new Schema({
    front: {
        type: String,
        trim: true,
        maxlength: [75, 'Предната част не може да бъде повече от 75 символа'],
        required: [true, 'Предната част е задължителна']
    },
    back: {
        type: String,
        maxlength: [75, 'Предната част не може да бъде повече от 75 символа'],
        trim: true,
        required: [true, 'Задната част е задължителна']
    },
});

const Flashcard = model('Flashcard', flashcardSchema);
export default Flashcard;
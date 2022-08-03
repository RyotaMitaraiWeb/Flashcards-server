import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const deckSchema = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: [10, 'Заглавието трябва да е между 10 и 100 символа'],
        maxlength: [100, 'Заглавието трябва да е между 10 и 100 символа'],
    },
    description: {
        type: String,
        trim: true,
        minlength: [1, 'Описанието трябва да е между 1 и 500 символа'],
        maxlength: [500, 'Описанието трябва да е между 1 и 500 символа']
    },

    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, "Авторът липсва"]
    },
    flashcards: [{
        type: Types.ObjectId,
        ref: 'Flashcard',
    }],

});

const Deck = model('Deck', deckSchema);
export default Deck;
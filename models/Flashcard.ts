import { Schema, model, Types } from 'mongoose';

const flashcardSchema: Schema = new Schema({
    front: {
        type: String,
        trim: true,
        validate: {},
        maxlength: [75, 'Предната част не може да бъде повече от 75 символа'],
        default: '',
    },
    back: {
        type: String,
        maxlength: [75, 'Предната част не може да бъде повече от 75 символа'],
        trim: true,
        default: ''
    },
    frontImage: {
        type: String,
        default: '',
    },
    backImage: {
        type: String,
        default: '',
    },
    deck: {
        type: Types.ObjectId,
        ref: 'Deck',
        required: [true, 'Тестето липсва']
    }

});

flashcardSchema.pre('validate', function (next) {
    const flashcard: any = this;
    if (!flashcard.front.trim() && !flashcard.frontImage) {
        flashcard.invalidate('front', 'Предната част трябва да има поне един символ ИЛИ снимка')
    }

    if (!flashcard.back.trim() && !flashcard.backImage) {
        flashcard.invalidate('back', 'Задната част трябва да има поне един символ ИЛИ снимка')
    }
    
    next();
});

const Flashcard = model('Flashcard', flashcardSchema);
export default Flashcard;
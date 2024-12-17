import mongoose, { Schema, Document, Model } from 'mongoose';

// 1️⃣ Define the TypeScript interface for Flashcard data
export interface IFlashcard extends Document {
    question: string;
    answer: string;
    category?: string;  // optional category field
    createdAt?: Date;   // auto-added timestamp
    updatedAt?: Date;   // auto-added timestamp
}

// 2️⃣ Create the Mongoose schema for the Flashcard model
const FlashcardSchema: Schema = new Schema(
    {
        question: {
            type: String,
            required: true, // this field is required
            trim: true,      // removes whitespace from both ends of the string
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            default: 'General', // default value for category
        },
    },
    {
        timestamps: true  // auto-add createdAt and updatedAt fields
    }
);

// 3️⃣ Export the Flashcard model using Mongoose
const Flashcard: Model<IFlashcard> = mongoose.model<IFlashcard>('Flashcard', FlashcardSchema);

export default Flashcard;

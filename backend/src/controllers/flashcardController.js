const Flashcard = require('../models/Flashcard');

// Create a flashcard
exports.createFlashcard = async (req, res) => {
    try {
        const { question, answer, tags } = req.body;
        const flashcard = new Flashcard({ question, answer, tags });
        await flashcard.save();
        res.status(201).json(flashcard);
    } catch (error) {
        res.status(400).json({ message: 'Error creating flashcard', error });
    }
};

// Get all flashcards
exports.getAllFlashcards = async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update flashcard
exports.updateFlashcard = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFlashcard = await Flashcard.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedFlashcard);
    } catch (error) {
        res.status(500).json({ message: 'Error updating flashcard', error });
    }
};

// Delete flashcard
exports.deleteFlashcard = async (req, res) => {
    try {
        const { id } = req.params;
        await Flashcard.findByIdAndDelete(id);
        res.status(200).json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting flashcard', error });
    }
};

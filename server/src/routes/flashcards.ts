import express, { Request, Response } from 'express';
import Flashcard from '../models/Flashcard'; // Ensure this path points to your Mongoose model

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const flashcards = await Flashcard.find();
        res.status(200).json(flashcards);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching flashcards:', error.message);
            res.status(500).json({ error: 'Failed to fetch flashcards', details: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { question, answer, category } = req.body;
        const newFlashcard = new Flashcard({ question, answer, category });
        const savedFlashcard = await newFlashcard.save();
        res.status(201).json(savedFlashcard);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error adding flashcard:', error.message);
            res.status(500).json({ error: 'Failed to add flashcard', details: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const flashcard = await Flashcard.findById(id);
        if (!flashcard) {
            res.status(404).json({ error: 'Flashcard not found' });
            return;
        }
        res.status(200).json(flashcard);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching flashcard:', error.message);
            res.status(500).json({ error: 'Failed to fetch flashcard', details: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { question, answer, category } = req.body;
        const updatedFlashcard = await Flashcard.findByIdAndUpdate(
            id,
            { question, answer, category },
            { new: true } // Return the updated document
        );
        if (!updatedFlashcard) {
            res.status(404).json({ error: 'Flashcard not found' });
            return;
        }
        res.status(200).json(updatedFlashcard);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error updating flashcard:', error.message);
            res.status(500).json({ error: 'Failed to update flashcard', details: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedFlashcard = await Flashcard.findByIdAndDelete(id);
        if (!deletedFlashcard) {
            res.status(404).json({ error: 'Flashcard not found' });
            return;
        }
        res.status(200).json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting flashcard:', error.message);
            res.status(500).json({ error: 'Failed to delete flashcard', details: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
});

export default router;

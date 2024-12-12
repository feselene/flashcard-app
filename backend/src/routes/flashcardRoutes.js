const express = require('express');
const { createFlashcard, getAllFlashcards, updateFlashcard, deleteFlashcard } = require('../controllers/flashcardController');
const router = express.Router();

router.post('/', createFlashcard);
router.get('/', getAllFlashcards);
router.put('/:id', updateFlashcard);
router.delete('/:id', deleteFlashcard);

module.exports = router;

import Flashcard, { IFlashcard } from './Flashcard'; // Adjust the path if needed

class FlashcardDeck {
    private flashcards: IFlashcard[] = [];

    constructor(initialDeck: IFlashcard[] = []) {
        this.flashcards = initialDeck;
    }

    // Add a flashcard to the deck
    async addFlashcard(question: string, answer: string, category?: string): Promise<IFlashcard> {
        const newFlashcard = new Flashcard({ question, answer, category });
        await newFlashcard.save();
        this.flashcards.push(newFlashcard);
        return newFlashcard;
    }

    // Remove a flashcard by ID
    async removeFlashcardById(id: string): Promise<boolean> {
        const result = await Flashcard.findByIdAndDelete(id);
        if (result) {
            this.flashcards = this.flashcards.filter(flashcard => String(flashcard._id) !== id);
            return true;
        }
        return false;
    }

    // Get all flashcards
    getAllFlashcards(): IFlashcard[] {
        return this.flashcards;
    }

    // Find a flashcard by ID
    findFlashcardById(id: string): IFlashcard | undefined {
        return this.flashcards.find(flashcard => String(flashcard._id) === id);
    }

    // Shuffle the deck (Fisher-Yates algorithm)
    shuffleDeck(): void {
        for (let i = this.flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.flashcards[i], this.flashcards[j]] = [this.flashcards[j], this.flashcards[i]];
        }
    }

    // Load flashcards from the database
    async loadFromDatabase(): Promise<void> {
        this.flashcards = await Flashcard.find();
    }
}

export default FlashcardDeck;

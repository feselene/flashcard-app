import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FlashcardDecksScreen.css';

// Define the type for a flashcard deck
interface FlashcardDeck {
  _id: string;
  title: string;
  flashcards: { question: string; answer: string }[]; // Adjust based on your flashcard structure
}

const FlashcardDecksScreen: React.FC = () => {
  const [flashcardDecks, setFlashcardDecks] = useState<FlashcardDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcardDecks = async () => {
      try {
        const response = await fetch('http://localhost:8080/flashcards'); // Adjust URL if needed
        const data = await response.json();
        const decks = data.map((flashcard: any) => ({
          _id: flashcard._id,
          title: flashcard.category || 'Untitled Deck',
          flashcards: [{ question: flashcard.question, answer: flashcard.answer }],
        }));
        setFlashcardDecks(decks);
      } catch (error) {
        console.error('Error fetching flashcard decks:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFlashcardDecks();
  }, []);
  

  const renderDeckItem = (deck: FlashcardDeck) => (
    <div className="deck-item" onClick={() => console.log('Navigating to deck detail:', deck._id)}>
      <div className="deck-header">
        <h3 className="deck-title">{deck.title}</h3>
        <p className="deck-count">{deck.flashcards.length} Cards</p>
      </div>
      <button className="study-button" onClick={(e) => {
        e.stopPropagation();
        navigate(`/flashcards/${deck._id}`); // Navigate to flashcardsScreen
      }}>Study Now</button>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Flashcard Decks</h1>
      <div className="deck-list">
        {flashcardDecks.map((deck) => (
          <div key={deck._id}>{renderDeckItem(deck)}</div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardDecksScreen;

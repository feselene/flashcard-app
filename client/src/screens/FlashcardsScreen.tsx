import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Flashcards.css'; // Assuming you will create a CSS file for styling

interface Flashcard {
  question: string;
  answer: string;
}

const FlashcardsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Simulate fetching flashcards for the deck
    const fetchFlashcards = async () => {
      try {
        console.log(`Fetching flashcards for deck ID: ${id}`);
        // Simulate an API call or use a real API endpoint
        const response = [
          { question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
          { question: 'What is a component?', answer: 'Reusable building block in React applications' },
        ];
        setFlashcards(response);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [id]);

  const handleNext = () => {
    setShowAnswer(false);
    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate('/'); // Redirect to the Flashcard Decks screen after finishing all flashcards
    }
  };

  if (loading) {
    return <div className="loading">Loading flashcards...</div>;
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="flashcards-container">
      <h1 className="deck-title">Flashcards for Deck {id}</h1>
      <div className="flashcard-item">
        <div className="flashcard-question">
          <strong>Q:</strong> {currentFlashcard.question}
        </div>
        {showAnswer && (
          <div className="flashcard-answer">
            <strong>A:</strong> {currentFlashcard.answer}
          </div>
        )}
      </div>
      <div className="review-controls">
        {!showAnswer ? (
          <button className="review-button show-answer" onClick={() => setShowAnswer(true)}>Show Answer</button>
        ) : (
          <>
            <button className="review-button easy" onClick={handleNext}>Easy</button>
            <button className="review-button medium" onClick={handleNext}>Medium</button>
            <button className="review-button hard" onClick={handleNext}>Hard</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FlashcardsScreen;

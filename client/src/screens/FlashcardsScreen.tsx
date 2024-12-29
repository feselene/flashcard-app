import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface FlashcardData {
    _id: string;
    question: string;
    answer: string;
}

const FlashcardsScreen: React.FC = () => {
    const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get('http://localhost:8080/flashcards');
                setFlashcards(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
                alert('Failed to fetch flashcards. Please check your backend.');
            }
        };

        fetchFlashcards();
    }, []);

    const handleDeleteFlashcard = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/flashcards/${id}`);
            const updatedFlashcards = flashcards.filter((flashcard) => flashcard._id !== id);
            setFlashcards(updatedFlashcards);
            setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
            alert('Flashcard deleted successfully!');
        } catch (error) {
            console.error('Error deleting flashcard:', error);
            alert('Failed to delete flashcard. Please try again.');
        }
    };

    const handleNext = () => {
        if (currentIndex < flashcards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowAnswer(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>My Flashcards</h1>

            {loading ? (
                <p>Loading flashcards...</p>
            ) : flashcards.length === 0 ? (
                <p>No flashcards available. Add some to get started!</p>
            ) : (
                <div style={styles.card}>
                    <h3 style={styles.question}>{flashcards[currentIndex].question}</h3>
                    {showAnswer && <p style={styles.answer}>{flashcards[currentIndex].answer}</p>}
                    <button
                        style={styles.showAnswerButton}
                        onClick={() => setShowAnswer(!showAnswer)}
                    >
                        {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    <button
                        style={styles.deleteButton}
                        onClick={() => handleDeleteFlashcard(flashcards[currentIndex]._id)}
                    >
                        Delete
                    </button>
                    <p style={styles.counter}>{`${currentIndex + 1} / ${flashcards.length}`}</p>
                </div>
            )}

            {flashcards.length > 0 && (
                <div style={styles.navigationButtons}>
                    <button
                        style={styles.navButton}
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                    >
                        Previous
                    </button>
                    <button
                        style={styles.navButton}
                        onClick={handleNext}
                        disabled={currentIndex === flashcards.length - 1}
                    >
                        Next
                    </button>
                </div>
            )}

            <Link to="/add-flashcard">
                <button style={styles.addButton}>Add Flashcard</button>
            </Link>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
    },
    title: {
        textAlign: 'center' as const,
        fontSize: '24px',
        marginBottom: '20px',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        margin: '10px 0',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
    },
    question: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '10px',
    },
    answer: {
        color: '#555',
        fontSize: '16px',
    },
    showAnswerButton: {
        marginTop: '10px',
        padding: '5px 10px',
        fontSize: '14px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    addButton: {
        display: 'block',
        margin: '20px auto',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    deleteButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    navButton: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
    },
    counter: {
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#777',
    },
};

export default FlashcardsScreen;

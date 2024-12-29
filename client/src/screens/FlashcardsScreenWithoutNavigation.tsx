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
    const [loading, setLoading] = useState<boolean>(true);

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
            setFlashcards(flashcards.filter((flashcard) => flashcard._id !== id));
            alert('Flashcard deleted successfully!');
        } catch (error) {
            console.error('Error deleting flashcard:', error);
            alert('Failed to delete flashcard. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>My Flashcards</h1>

            {loading ? (
                <p>Loading flashcards...</p>
            ) : (
                flashcards.map((flashcard) => (
                    <div key={flashcard._id} style={styles.card}>
                        <h3 style={styles.question}>{flashcard.question}</h3>
                        <p style={styles.answer}>{flashcard.answer}</p>
                        <button
                            style={styles.deleteButton}
                            onClick={() => handleDeleteFlashcard(flashcard._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
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
};

export default FlashcardsScreen;

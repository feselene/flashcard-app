import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFlashcardScreen: React.FC = () => {
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [newAnswer, setNewAnswer] = useState<string>('');
    const navigate = useNavigate();

    const handleAddFlashcard = async () => {
        if (newQuestion.trim() === '' || newAnswer.trim() === '') {
            alert('Both question and answer are required.');
            return;
        }

        const newFlashcard = { question: newQuestion, answer: newAnswer };

        try {
            await axios.post('http://localhost:8080/flashcards', newFlashcard);
            alert('Flashcard added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error adding flashcard:', error);
            alert('Failed to add flashcard. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Add a New Flashcard</h1>
            <input
                type="text"
                placeholder="Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                style={styles.input}
            />
            <button style={styles.submitButton} onClick={handleAddFlashcard}>
                Submit
            </button>
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
    input: {
        display: 'block',
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    submitButton: {
        display: 'block',
        margin: '0 auto',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
};

export default AddFlashcardScreen;

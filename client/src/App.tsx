import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FlashcardData {
    _id: string;
    question: string;
    answer: string;
}

const sampleFlashcards: FlashcardData[] = [
    { _id: '1', question: 'What is React?', answer: 'A JavaScript library for building UIs' },
    { _id: '2', question: 'What is TypeScript?', answer: 'A superset of JavaScript with types' },
    { _id: '3', question: 'What is a Closure?', answer: 'A function that remembers its lexical scope' },
];

const App: React.FC = () => {
    const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [newAnswer, setNewAnswer] = useState<string>('');

    // Simulate data fetching with setTimeout
    useEffect(() => {
        setTimeout(() => {
            setFlashcards(sampleFlashcards);
            setLoading(false);
        }, 1000);
    }, []);

    const handleAddFlashcard = async () => {
        if (newQuestion.trim() === '' || newAnswer.trim() === '') {
            alert('Both question and answer are required.');
            return;
        }
    
        const newFlashcard = {
            question: newQuestion,
            answer: newAnswer,
        };
    
        try {
            // Send the new flashcard to the backend
            const response = await axios.post('http://localhost:8080/flashcards', newFlashcard);
    
            // Update the local state with the new flashcard
            setFlashcards([...flashcards, response.data]);
            setNewQuestion('');
            setNewAnswer('');
            setShowForm(false);
            alert('Flashcard added successfully!');
        } catch (error) {
            console.error('Error adding flashcard:', error);
            alert('Failed to add flashcard. Please try again.');
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
                    </div>
                ))
            )}

            <button style={styles.addButton} onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Flashcard'}
            </button>

            {showForm && (
                <div style={styles.formContainer}>
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
            )}
        </div>
    );
};

// Styles object
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
    formContainer: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
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

export default App;

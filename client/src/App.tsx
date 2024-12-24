import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FlashcardData {
    _id: string;
    question: string;
    answer: string;
}

const App: React.FC = () => {
    const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [newAnswer, setNewAnswer] = useState<string>('');
    const [editingFlashcard, setEditingFlashcard] = useState<FlashcardData | null>(null);

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

    const handleAddFlashcard = async () => {
        if (newQuestion.trim() === '' || newAnswer.trim() === '') {
            alert('Both question and answer are required.');
            return;
        }

        const newFlashcard = { question: newQuestion, answer: newAnswer };

        try {
            const response = await axios.post('http://localhost:8080/flashcards', newFlashcard);
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

    const handleEditFlashcard = (flashcard: FlashcardData) => {
        setEditingFlashcard(flashcard);
    };

    const handleUpdateFlashcard = async () => {
        if (!editingFlashcard) return;

        try {
            const response = await axios.put(`http://localhost:8080/flashcards/${editingFlashcard._id}`, editingFlashcard);
            setFlashcards(
                flashcards.map((flashcard) =>
                    flashcard._id === editingFlashcard._id ? response.data : flashcard
                )
            );
            setEditingFlashcard(null);
            alert('Flashcard updated successfully!');
        } catch (error) {
            console.error('Error updating flashcard:', error);
            alert('Failed to update flashcard. Please try again.');
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
                        <button
                            style={styles.editButton}
                            onClick={() => handleEditFlashcard(flashcard)}
                        >
                            Edit
                        </button>
                    </div>
                ))
            )}

            {editingFlashcard && (
                <div style={styles.formContainer}>
                    <h3>Edit Flashcard</h3>
                    <input
                        type="text"
                        value={editingFlashcard.question}
                        onChange={(e) =>
                            setEditingFlashcard({ ...editingFlashcard, question: e.target.value })
                        }
                        style={styles.input}
                    />
                    <input
                        type="text"
                        value={editingFlashcard.answer}
                        onChange={(e) =>
                            setEditingFlashcard({ ...editingFlashcard, answer: e.target.value })
                        }
                        style={styles.input}
                    />
                    <button style={styles.submitButton} onClick={handleUpdateFlashcard}>
                        Update
                    </button>
                    <button
                        style={styles.cancelButton}
                        onClick={() => setEditingFlashcard(null)}
                    >
                        Cancel
                    </button>
                </div>
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

// Updated styles
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
    editButton: {
        position: 'absolute',
        top: '10px',
        right: '80px',
        backgroundColor: '#ffc107',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
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
    cancelButton: {
        display: 'block',
        margin: '10px auto',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
};

export default App;

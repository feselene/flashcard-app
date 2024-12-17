import React, { useEffect, useState } from 'react';

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

    // 🔥 Simulate data fetching with setTimeout
    useEffect(() => {
        setTimeout(() => {
            setFlashcards(sampleFlashcards);
            setLoading(false);
        }, 1000);
    }, []);

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
        </div>
    );
};

// 🔥 Fix the styles object by explicitly typing it as Record<string, React.CSSProperties>
const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f5f5f5',
    },
    title: {
        textAlign: 'center' as const, // Use "as const" for exact type
        fontSize: '24px',
        marginBottom: '20px'
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        margin: '10px 0',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    question: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '10px',
    },
    answer: {
        color: '#555',
        fontSize: '16px',
    }
};

export default App;

import React from 'react';

interface FlashcardProps {
    question: string;
    answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
    return (
        <div style={styles.card}>
            <h3 style={styles.question}>{question}</h3>
            <p style={styles.answer}>{answer}</p>
        </div>
    );
};

const styles = {
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
        marginBottom: '10px'
    },
    answer: {
        color: '#555',
        fontSize: '16px'
    }
};

export default Flashcard;

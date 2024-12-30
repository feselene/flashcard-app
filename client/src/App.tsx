import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlashcardDecksScreen from 'screens/FlashcardDecksScreen';
import FlashcardsScreen from 'screens/FlashcardsScreen';
import AddFlashcardScreen from 'screens/AddFlashcardScreen';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FlashcardDecksScreen />} />
                <Route path="/flashcards/:id" element={<FlashcardsScreen />} />
                <Route path="/flashcards" element={<FlashcardsScreen />} />
                <Route path="/add-flashcard" element={<AddFlashcardScreen />} />
            </Routes>
        </Router>
    );
};

export default App;

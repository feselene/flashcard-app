import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlashcardsScreen from 'screens/FlashcardsScreen';
import AddFlashcardScreen from 'screens/AddFlashcardScreen';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FlashcardsScreen />} />
                <Route path="/add-flashcard" element={<AddFlashcardScreen />} />
            </Routes>
        </Router>
    );
};

export default App;

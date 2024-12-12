require('dotenv').config(); // 1. Load .env variables at the top

const express = require('express'); // 2. Import express (server framework)
const connectDB = require('./config/db'); // 3. Import connectDB function
const flashcardRoutes = require('./routes/flashcardRoutes'); // 4. Import routes
const app = express(); // 5. Initialize express app

// 6. Check and log MONGO_URI for debugging (only in development)
if (process.env.NODE_ENV !== 'production') {
    console.log('MONGO_URI:', process.env.MONGO_URI || 'Not Found');
    // If undefined, the .env file is not loaded properly
}

// 7. Connect to MongoDB
connectDB();

// 8. Middleware to parse incoming requests (important)
app.use(express.json());

// 9. Define routes for API
app.use('/api/flashcards', flashcardRoutes);

// 10. Catch-all route for unmatched endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

// 11. Global error handler to catch server-side errors
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

// 12. Start server on PORT from .env (or 5000 if undefined)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const mongoose = require('mongoose'); // Import Mongoose to connect to MongoDB

// ✅ Function to connect to MongoDB
const connectDB = async () => {
    try {
        console.log('🔗 Connecting to MongoDB at:', process.env.MONGO_URI); // Debug log

        // Modern connection syntax (Mongoose v6+ doesn't need useNewUrlParser or useUnifiedTopology)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // Optional: Fail connection if it takes too long
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`); // Success log
    } catch (error) {
        console.error(`❌ Error: ${error.message}`); // Log error if any
        process.exit(1); // Exit process if unable to connect
    }
};

module.exports = connectDB; // ✅ Export the function for use in app.js

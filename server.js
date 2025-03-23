const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views'))); // Frontend Serve කිරීම

// API Routes
app.use('/api', taskRoutes); // "/api" යටතේ routes

// Start Server
app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});
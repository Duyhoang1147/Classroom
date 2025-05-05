const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const conectDB = require('./database/connectDB');
const errorHandler = require('./middleware/databaseError');

const app = express();
const port = process.env.PORT || 3090;

// Connect to MongoDB
conectDB()
// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

//routers
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});

// Start server
app.listen(port, () => {
    console.log('status server: ', process.env.NODE_ENV);
    console.log(`Server is running on http://localhost:${port}`);
});
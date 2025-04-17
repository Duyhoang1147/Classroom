require('dotenv').config();
const express = require('express');
const connectDB = require('./database/connectDB');

const app = express();
const link = process.env.MONGO_URI || 'mongodb://localhost:27017/classroom';
const PORT = process.env.PORT || 5000;

connectDB(link)

app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

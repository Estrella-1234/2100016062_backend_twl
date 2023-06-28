const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const cors = require('cors');
require('dotenv').config(); // Load dotenv

// Set up the Express app
const app = express();
const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI1, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

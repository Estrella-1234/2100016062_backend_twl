const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');

// Set up the Express app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://gemilang:tirto@tekweblanjut.hwlpdlr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

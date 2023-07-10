const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// const routes = require('./src/routes');
const routes = require('./src/routes/routesAuth');
const routesMhs = require('./src/routes/routesMhs');
const routerDsn = require('./src/routes/routesDsn');
const routesUpload = require('./src/routes/routesUpload');
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

// Routes Mahasiswa
app.use('/', routesMhs)

// Routes Dosen
app.use('/', routerDsn)

// Routes Upload
app.use('/', routesUpload)

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads/img')));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

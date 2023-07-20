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
const port = 3001;
const uri = "mongodb+srv://gemilang:tirto@cluster0.gfs5dhs.mongodb.net/?retryWrites=true&w=majority/twl";

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
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

app.get('/', (req, res) => {
  res.send('It works!');
});

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// // Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/relations', require('./routes/api/relations'));
app.use('/api/stocks', require('./routes/api/stocks'));
app.use('/api/catalogs', require('./routes/api/catalogs'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/operations', require('./routes/api/operations'));
app.use('/api/reports', require('./routes/api/reports'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
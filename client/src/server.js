const express = require('express');
const mongoose = require('mongoose');
const Location = require('./models/Location');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ait-campus', { useNewUrlParser: true });

app.get('/locations', async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

app.listen(5000, () => console.log('Server running on port 5000'));
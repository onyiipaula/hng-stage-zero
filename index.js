const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());


if (!process.env.EMAIL || !process.env.GITHUB_URL) {
  console.error('Required environment variables are not set');
  process.exit(1);
}

app.get('/', (req, res) => {
  try {
    const response = {
      email: process.env.EMAIL,
      current_datetime: new Date().toISOString(),
      github_url: process.env.GITHUB_URL
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
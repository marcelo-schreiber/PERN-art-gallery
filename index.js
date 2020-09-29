const express = require('express');
const pool = require('./db.js');
// const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

// app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  // serve static content
  app.use(express.static(path.join(__dirname, '/Frontend/build')));
}
app.get('/gallery', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM arts ORDER BY id DESC LIMIT 25');
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post('/gallery', async (req, res) => {
  try {
    const { img, author } = req.body;
    const sendData = await pool.query(
      'INSERT INTO arts (img, author) VALUES ($1, $2) RETURNING *',
      [img, author]
    );

    res.json(sendData.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get('*', (req, res) => {
  res.send(path.join(__dirname, 'Frontend/build/index.html'));
});

app.listen(port, () => console.log(`Gallery-app listening on port ${port}!`));

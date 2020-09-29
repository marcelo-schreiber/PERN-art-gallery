const express = require('express');
const pool = require('./db.js');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/gallery', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM arts ORDER BY id DESC LIMIT 20');
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

app.listen(port, () => console.log(`Gallery-app listening on port ${port}!`));

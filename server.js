const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const eventData = req.body;

  fs.appendFile('events.txt', JSON.stringify(eventData) + '\n', (err) => {
    if (err) {
      console.error('Error writing to events.txt:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Event data written to events.txt');
    res.status(200).send('Event received and saved successfully');
  });
});

app.get('/events', (req, res) => {
  fs.readFile('events.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading events.txt:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.header('Content-Type', 'text/plain');
    res.status(200).send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

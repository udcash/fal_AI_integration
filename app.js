const express = require('express');
const http = require('http');

const port = 3000;

const app = express();
app.use('/', express.static(__dirname));
const server = http.createServer(app);

app.post('/speak', async (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    // Send to D-ID streaming
    await handleTalk(text);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to speak with D-ID' });
  }
});
server.listen(port, () => console.log(`Server started on port localhost:${port}`));

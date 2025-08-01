const express = require('express');
const http = require('http');
const speakRoutes = require('./routes/speakRoute');
const connectRoutes = require('./routes/connectRoute');
const videoAgentRoutes =require('./routes/videoAgentRoutes')

const backgroundRoutes = require("./routes/backgroundRoutes");
const talkRoutes = require("./routes/talkRoutes");
const port = 3000;
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/views'));
app.use(express.json());
const server = http.createServer(app);

app.use("/processed", express.static(path.join(__dirname, "public/processed")));
app.use("/uploads", express.static("uploads"));
app.use("/api/background", backgroundRoutes);
app.use("/api/talk", talkRoutes);
app.use('/speak', speakRoutes);
app.use('/connect', connectRoutes);
app.use("/api/video-agent", videoAgentRoutes);
server.listen(port, () => console.log(`Server started on port localhost:${port}`));

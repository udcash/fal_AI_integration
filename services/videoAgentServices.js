// services/videoAgentService.js
const fetch = require("node-fetch");
const config = require("../config/apiConfig.js");

const DID_API_URL = config.url || "https://api.d-id.com";

const createStream = async () => {
  const response = await fetch(`${DID_API_URL}/talks/streams`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(config.key + ":").toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_url: config.source_url,
      stream_warmup: true,
      config: {
        video_quality: "hd",
      },
    }),
  });
  return response.json();
};

const sendSDPAnswer = async (streamId, sessionId, answer) => {
  return fetch(`${DID_API_URL}/talks/streams/${streamId}/sdp`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(config.key + ":").toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer, session_id: sessionId }),
  });
};

const deleteStream = async (streamId, sessionId) => {
  return fetch(`${DID_API_URL}/talks/streams/${streamId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${Buffer.from(config.key + ":").toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session_id: sessionId }),
  });
};

module.exports = { createStream, sendSDPAnswer, deleteStream };

"use strict";
const fetch = require("node-fetch");
const DID_API_URL = "https://api.d-id.com";

// Backend function to create a stream
async function createStream({ apiKey, sourceUrl }) {
  const response = await fetch(`${DID_API_URL}/talks/streams`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_url: sourceUrl,
      stream_warmup: true,
      config: { video_quality: "hd" },
    }),
  });
  return response.json();
}

// Backend function to send SDP answer
async function sendSDPAnswer({ apiKey, streamId, answer, sessionId }) {
  const response = await fetch(`${DID_API_URL}/talks/streams/${streamId}/sdp`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      answer,
      session_id: sessionId,
    }),
  });
  return response.json();
}

// Backend function to handle connect
async function handleConnect({ apiKey, sourceUrl }) {
  try {
    const { id, offer, ice_servers, session_id } = await createStream({ apiKey, sourceUrl });
    return { success: true, streamId: id, sessionId: session_id, offer, ice_servers };
  } catch (error) {
    console.error("Connection failed:", error);
    return { success: false, error: error.message };
  }
}

// Backend function to handle talk
async function handleTalk({ apiKey, streamId, sessionId, message, voiceId }) {
  try {
    const paddedMessage = "." + message;
    const talkResponse = await fetch(
      `${DID_API_URL}/talks/streams/${streamId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          script: {
            type: "text",
            input: paddedMessage,
            provider: {
              type: "elevenlabs",
              voice_id: voiceId,
            },
          },
          config: { fluent: true, stitch: true },
          driver_url: "bank://lively/",
          session_id: sessionId,
        }),
      }
    );
    if (!talkResponse.ok) throw new Error("Failed to send to D-ID");
    return { success: true };
  } catch (error) {
    console.error("Talk Error:", error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  createStream,
  sendSDPAnswer,
  handleConnect,
  handleTalk,
};

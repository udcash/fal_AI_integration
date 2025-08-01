const axios = require('axios');
const config = require('../config/apiConfig.js');

exports.sendToDID = async (streamId, sessionId, message) => {
  const paddedMessage = '.' + message;

  const response = await axios.post(`${config.DID_API_URL}/talks/streams/${streamId}`, {
    script: {
      type: "text",
      input: paddedMessage,
      provider: {
        type: "elevenlabs",
        voice_id: config.voice_id
      }
    },
    config: { fluent: true, stitch: true },
    driver_url: "bank://lively/",
    session_id: sessionId
  }, {
    headers: {
      Authorization: `Basic ${Buffer.from(config.key + ':').toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};

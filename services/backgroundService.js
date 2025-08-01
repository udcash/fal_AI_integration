const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const config = require('../config/apiConfig');

exports.removeBgFromFile = async (file) => {
  const formData = new FormData();
  formData.append('image_file', fs.createReadStream(file.path));
  formData.append('size', 'auto');

  const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
    headers: {
      ...formData.getHeaders(),
      'X-Api-Key': config.REMOVE_BG_KEY
    },
    responseType: 'arraybuffer'
  });

  const outputPath = path.join(__dirname, '../public/processed', `${file.filename}_no-bg.png`);
  fs.writeFileSync(outputPath, response.data);

  return `/processed/${file.filename}_no-bg.png`;
};

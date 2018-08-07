const axios = require('axios');

module.exports = (url) => {
  return (data) => {
    return axios({
      method: 'post',
      url: url,
      data: data,
    });
  }
}
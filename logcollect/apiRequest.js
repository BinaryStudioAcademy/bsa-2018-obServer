const axios = require('axios');

module.exports = (url, token) => {
  return (data) => {
    return axios({
      method: 'post',
      url: url,
      data: data,
      headers: { 'X-ACCESS-TOKEN': token },
    });
  }
}
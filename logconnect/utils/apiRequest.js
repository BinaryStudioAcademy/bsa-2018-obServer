const axios = require('axios');

module.exports = (url) => {
  return (data) => {
    return axios({
      method: 'post',
      url: url,
      data: data,
    }).catch((error) => {
      console.log(error.message);
    });
  }
}
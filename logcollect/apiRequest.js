const axios = require('axios');

module.exports = (url, companyToken) => {
  return (data) => {
    return axios({
      method: 'post',
      url: url,
      data: data,
      headers: { 'X-ACCESS-TOKEN': companyToken },
    }).catch((error) => {
      console.log(error.message);
    });
  }
}
const axios = require('axios');

module.exports = (url, companyToken) => {
  return (data, urlTail) => {
    return axios({
      method: 'post',
      url: url + urlTail,
      data: data,
      headers: { 'X-ACCESS-TOKEN': companyToken },
    }).catch((error) => {
      console.log(error.message);
    });
  }
}
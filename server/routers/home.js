const axios = require('axios');
// 获取模板文件
const getTemplate = file => {
  return axios
    .get('http://0.0.0.0:8080/public/' + file + '.ejs')
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
};

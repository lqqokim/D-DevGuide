const { Router } = require('express');
const router = Router();
const request = require('request');

router.post('/', (req, res) => {
  const { token } = req.body;
  console.log('token :: ', token);

  if (token) {
    return checkUserByToken(token, (user) => {
      return res.json(user);
    });
  }
  res.send({ success: false, msg: '해당 토큰에 대한 유저정보가 없습니다.' });
});

const checkUserByToken = (token, cb) => {
  const options = {
    url: 'http://localhost:3000/html/__LoginCheckBL.jsp',
    method: 'POST',
    headers: {
      Accept: 'text/plain, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // Referer: 'http://localhost:3000/html/PagePanel.html?pageId=dbs',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
    },
    form: {
      key: token,
    },
  };

  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body);
      console.log('result :: ', result);
      cb(result);
    } else {
      console.log('error :: ', error);
    }
  }

  request(options, callback);
};

module.exports = router;

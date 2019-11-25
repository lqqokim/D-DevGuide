const { Router } = require('express');
const router = Router();
const request = require('request-promise-native');

router.post('/', (req, res) => {
  const { token } = req.body;

  if (token) {
    checkUserByToken(token)
      .then((result) => {
        res.send(JSON.parse(result));
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

const checkUserByToken = (token) => {
  const options = {
    url: process.env.BASE_URL + '/html/__LoginCheckBL.jsp',
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

  return request(options);
};

router.post('/delete', (req, res) => {
  const { token } = req.body;
  console.log('delete token :: ', token);

  if (token) {
    deleteUserByToken(token, (user) => {
      res.json(user);
    });
  }
  res.send({ success: false, msg: '해당 토큰에 대한 유저정보가 없습니다.' });
});

const deleteUserByToken = (token, cb) => {
  const options = {
    url: process.env.BASE_URL + '/html/Settings/ServiceLeave.jsp',
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

  return request(options);
};

module.exports = router;

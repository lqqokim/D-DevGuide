const request = require('request');

export const memberCheckDBS = (user, cb) => {
  const options = {
    url: 'http://localhost:3000/html/MemberChcek.jsp',
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
      memberID: user.loginId,
      memberPW: user.loginPw,
    },
  };

  function callback(error, response, body) {
    console.log('[DBS 맴버 체크]', body);
    console.log('[statusCode]', response && response.statusCode);

    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body);
      cb(result);
    } else {
      console.error('DBS 에서 유저정보를 가져오는데 문제가 발생하였습니다.');
    }
  }

  request(options, callback);
};

export const createTokenDBS = (user, cb) => {
  const options = {
    url: 'http://localhost:3000/html/LoginBL.jsp',
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
      memberID: user.loginId,
      memberPW: user.loginPw,
    },
  };

  function callback(error, response, body) {
    console.log('[DBS 토큰 생성]', body);
    console.log('[statusCode]', response && response.statusCode);

    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body);
      cb(result);
    } else {
      console.error('DBS 에서 Token 을 가져오는데 문제가 발생하였습니다.');
      // 프론트 서버에러 화면 위임필요
    }
  }

  request(options, callback);
};

export const updateAuthority = (user, cb) => {
  const options = {
    url: 'http://localhost:3000/html/UpdateAutority.jsp',
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
      memberID: user.loginId,
      authority: user.authority,
    },
  };

  function callback(error, response, body) {
    console.log('[DBS 토큰 생성]', body);
    console.log('[statusCode]', response && response.statusCode);

    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body);
      cb(result);
    } else {
      console.error('DBS 에서 Token 을 가져오는데 문제가 발생하였습니다.');
      // 프론트 서버에러 화면 위임필요
    }
  }

  request(options, callback);
};

export const createUser = (user, cb) => {
  const options = {
    url: 'http://localhost:3000/html/Account.jsp',
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
      memberID: user.loginId,
      authority: user.authority,
    },
  };

  function callback(error, response, body) {
    console.log('[DBS 토큰 생성]', body);
    console.log('[statusCode]', response && response.statusCode);

    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body);
      cb(result);
    } else {
      console.error('DBS 에서 Token 을 가져오는데 문제가 발생하였습니다.');
      // 프론트 서버에러 화면 위임필요
    }
  }

  request(options, callback);
};

const request = require('request');

export const memberCheckDBS = (user, cb) => {
  const options = {
    url: 'http://localhost:3000/html/MemberCheck.jsp',
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
    console.log('[statusCode]', response && response.statusCode);
    console.log('[DBS 맴버 체크]', JSON.parse(body));

    /* {                                                                                                                                                                                                                                                   17:21:54
        result: true,
        data: {
          ID: 'kis4204@douzone.com',
          IDX: '376',
          NAME: '김인수',
          AUTHORITY: 'M'
        },
        resultCode: '0',
        message: ''
      } */

    if (!error && response.statusCode === 200) {
      const { resultCode } = JSON.parse(body);
      cb(resultCode);
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
    console.log('[statusCode]', response && response.statusCode);
    console.log('[DBS 토큰 생성]', JSON.parse(body));

    if (!error && response.statusCode === 200) {
      cb(JSON.parse(body));
    } else {
      // status: 500 서버에러 // 프론트 서버에러 화면 위임필요
      console.error('DBS 에서 Token 을 가져오는데 문제가 발생하였습니다.');
    }
  }

  request(options, callback);
};

export const createUser = (user, cb) => {
  const options = {
    url: 'http://localhost:3000/html/CreateUser.jsp',
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
      memberEmail: user.loginId + '@douzone.com',

      memberName: user.empName,
      memberBirth: '',
      memberSex: '',

      memberImg: user.photoUrl,
    },
  };

  // String memberID = request.getParameter("memberID");
  // String memberPW = request.getParameter("memberPW");
  // String memberEmail = request.getParameter("memberEmail");
  //
  // String memberName = request.getParameter("memberName");
  // String memberBirth = request.getParameter("memberBirth");
  // String memberSex = request.getParameter("memberSex");

  function callback(error, response, body) {
    console.log('[statusCode]', response && response.statusCode);
    console.log('[DBS 유저 추가]', JSON.parse(body));

    if (!error && response.statusCode === 200) {
      cb(JSON.parse(body));
    } else {
      // 프론트 서버에러 화면 위임필요, 서버에
      console.error('DBS에 유저를 추가하는 과정에서 서버에러 발생');
    }
  }

  request(options, callback);
};

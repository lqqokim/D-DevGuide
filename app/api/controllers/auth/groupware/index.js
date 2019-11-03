const request = require('request');

/**
 * 로그인 정보로 해당 직원이 그룹웨어에 존재하는지 확인한다.
 * @param user
 * @param cb
 */
export const checkGWA = (user, cb) => {
  console.log('user :: ', user);

  const requestBody = {
    header: {
      empSeq: '',
      groupSeq: '',
      tId: '',
      pId: '',
    },
    body: {
      loginId: user.loginId,
      loginPasswd: user.loginPw,
      callerName: 'DBS',
    },
  };

  const options = {
    url: 'https://gwa.douzone.com/interlock/api/orgchart/CheckLogin',
    method: 'POST',
    body: requestBody,
    json: true,
  };

  request(options, function(error, response, body) {
    console.log('========================');
    console.log('[statusCode]', response && response.statusCode);
    console.log('[직원 체크]', body);

    if (!error && response.statusCode === 200) {
      cb(body);
    } else {
      console.log(error);
    }
  });
  console.log('========================');
};

/***
 * 로그인 정보를 통해 그룹웨어 직원 정보를 가져온다.
 * @param user
 * @param cb
 */
export const userGWA = (user, cb) => {
  const requestBody = {
    header: {
      empSeq: '',
      groupSeq: '',
      tId: '',
      pId: '',
    },
    body: {
      loginId: user.loginId,
      langCode: 'kr',
      callerName: 'ERP_COMMON',
    },
  };

  const options = {
    url: 'https://gwa.douzone.com/interlock/api/orgchart/SearchUser',
    method: 'POST',
    body: requestBody,
    json: true,
  };

  request(options, function(error, response, body) {
    console.log('[직원 정보]', body);
    if (!error && response.statusCode === 200) {
      cb(body);
    } else {
      console.log(error);
    }
  });
};

const request = require('request');

/**
 * 로그인 정보로 해당 직원이 그룹웨어에 존재하는지 확인한다.
 * @param user
 * @param cb
 */
export const checkLogin = (user, cb) => {
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
    console.log('[그룹웨어 체크]', body);

    /* {                                                                                                                                                     12:24:12
      resultCode: '0',
      resultMessage: 'SUCCESS',
      result: {}
    } */

    if (!error && response.statusCode === 200) {
      const { resultCode } = body;
      cb(resultCode);
    } else {
      console.log(error);
    }
  });
};

/***
 * 로그인 정보를 통해 그룹웨어 직원 정보를 가져온다.
 * @param user
 * @param cb
 */
export const searchUser = (user, cb) => {
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
    console.log('[statusCode]', response && response.statusCode);
    console.log('[그룹웨어 조회]', body);
    if (!error && response.statusCode === 200) {
      cb(body);
    } else {
      console.log(error);
    }
  });
};

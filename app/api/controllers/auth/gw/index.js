const request = require('request-promise-native');

/**
 * 로그인 정보로 해당 직원이 그룹웨어에 존재하는지 확인한다.
 * @param user
 */
export const checkGroupwareUser = (user) => {
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

  return request(options);
};

/**
 * 로그인 정보를 통해 그룹웨어 직원 정보를 가져온다.
 * @param user
 * @private
 */
export const searchUser = (user) => {
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

  return request(options);
};

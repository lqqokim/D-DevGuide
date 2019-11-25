const request = require('request-promise-native');

/**
 * DBS 직원이 존재하는지 체크 한다.
 * @param user
 * @returns {request.Request}
 */
export const checkDBSUser = (user) => {
  const options = {
    url: process.env.BASE_URL + '/html/MemberCheck.jsp',
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

  return request(options);
};

/**
 * 토큰을 생성한다.
 * @param user
 */
export const createToken = (user) => {
  const options = {
    url: process.env.BASE_URL + '/html/LoginBL.jsp',
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

  return request(options);
};

/**
 * DBS에 신규 직원을 추가한다.
 * @param user
 */
export const createUser = async (user) => {
  const options = {
    url: process.env.BASE_URL + '/html/CreateUser.jsp',
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

      memberName: user.name,
      memberBirth: '',
      memberSex: '',

      memberProfile: user.photoUrl,
    },
  };

  try {
    const res = await request(options);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = (user) => {
  const options = {
    url: process.env.BASE_URL + '/html/CreateUser.jsp',
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

  return request(options);
};

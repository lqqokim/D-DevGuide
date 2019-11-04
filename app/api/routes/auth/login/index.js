import { checkLogin, searchUser } from './../../../controllers/auth/gw';
import {
  memberCheckDBS,
  createTokenDBS,
  createUser,
} from './../../../controllers/auth/dbs';

const { Router } = require('express');
const router = Router();

router.post('/userLogin', (req, res) => {
  const { user } = req.body;

  checkLogin(user, (resultCode) => {
    // 그룹웨어 직원 존재
    if (resultCode === '0') {
      memberCheckDBS(user, (resultCode) => {
        // DBS 직원 존재
        if (resultCode === '0') {
          createToken(user, res);
        } else {
          // 그룹웨어 직원 조회
          searchUser(user, (result) => {
            if (result.resultCode === '0') {
              const searchUser = result.result.user;
              searchUser.loginId = user.loginId;
              searchUser.loginPw = user.loginPw;

              // DBS 직원 추가
              createUser(searchUser, (result) => {
                if (result.resultCode === '0') {
                  createToken(user, res);
                } else {
                  // 서버에러
                  console.error(
                    'DBS에 직원 추가가 정상적으로 되지 않았습니다.'
                  );
                }
              });
            } else {
              // 서버에
              console.error(
                '그룹웨어에서 직원 정보를 가져오는데 문제가 생겼습니다.'
              );
            }
          });
        }
      });
    } else {
      res.send({ data: '', msg: '회원정보를 찾을 수 없습니다.' });
    }
  });
});

const createToken = (user, res) => {
  createTokenDBS(user, (result) => {
    if (result.resultCode === '0') {
      res.status(200).send({ data: result.key, sg: '' });
    } else {
      // 서버에러
      res.status(400).send({
        data: '',
        msg: '토큰 발급이 제대로 이루어지지 않았습니다.',
      });
    }
  });
};

module.exports = router;

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
          createTokenDBS(user, (result) => {
            if (result.resultCode === '0') {
              res.status(200).send({ data: result.key, msg: '' });
            } else {
              res.status(400).send({
                data: '',
                msg: '토큰발급이 제대로 이루어지지 않았습니다.',
              });
            }
          });
        } else {
          // 그룹웨어 직원 조회
          searchUser(user, (result) => {
            if (result.resultCode === '0') {
              createUser(user, (result) => {
                const insertUser = {};
              });
            } else {
            }
          });
        }
      });
    } else {
      memberCheckDBS(user, (result) => {
        console.log('1) result :: ', result);
      });
    }
  });
});

module.exports = router;

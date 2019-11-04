import { checkLogin, searchUser } from './../../../controllers/auth/gw';

const { Router } = require('express');
const router = Router();

router.post('/checkLogin', (req, res) => {
  const { user } = req.body;

  if (user) {
    // 그룹웨어 직원 확인
    checkLogin(user, (requestRes) => {
      if (requestRes.resultCode === '0') {
        // 존재
        res.status(200).send(0);
      } else {
        res.status(200).send(1);
      }
    });
  }
});

router.post('/searchUser', (req, res) => {
  const { user } = req.body;

  if (user) {
    // 그룹웨어 직원 정보 확인
    searchUser(user, (requestRes) => {
      if (requestRes.resultCode === '0') {
        res.status(200).send(requestRes);
      } else {
        // 존재 하지 않음
      }
    });
  }
});

module.exports = router;

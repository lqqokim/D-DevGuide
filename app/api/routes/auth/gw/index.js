import { checkGWA, userGWA } from '../../../controllers/auth/groupware';

const { Router } = require('express');
const router = Router();

router.post('/checkLogin', (req, res) => {
  const { user } = req.body;

  if (user) {
    // 그룹웨어 직원 확인
    checkGWA(user, (requestRes) => {
      if (requestRes.resultCode === '0') {
        res.status(200).send(requestRes);
        // 그룹웨어 직원 정보 확인
      } else {
        // 존재 하지 않음
      }
    });
  }
});

router.post('/searchUser', (req, res) => {
  const { user } = req.body;

  if (user) {
    // 그룹웨어 직원 정보 확인
    userGWA(user, (requestRes) => {
      if (requestRes.resultCode === '0') {
        res.status(200).send(requestRes);
      } else {
        // 존재 하지 않음
      }
    });
  }
});

module.exports = router;

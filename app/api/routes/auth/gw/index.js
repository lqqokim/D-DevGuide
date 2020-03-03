import {
  checkGroupwareUser,
  searchUser,
  searchUserList,
} from './../../../controllers/auth/gw';

const { Router } = require('express');
const router = Router();

router.post('/checkLogin', (req, res) => {
  const { user } = req.body;

  if (user) {
    // 그룹웨어 직원 확인
    checkGroupwareUser(user, (requestRes) => {
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

// 이름으로 그룹웨어 사용자 다이얼로그 데이터 조회
router.post('/searchUserByName', (req, res) => {
  const { user } = req.body;

  if (user) {
    searchUserList(user)
      .then((userList) => {
        res.status(200).send({ success: true, data: userList });
      })
      .catch((err) => {
        res.status(500).send({ success: false, msg: err.message });
      });
  }
});

// 아이디로 그룹웨어 사용자 다이얼로그 데이터 조회
router.post('/searchUserByID', (req, res) => {
  const { user } = req.body;

  if (user) {
    searchUser(user)
      .then((userResult) => {
        res.status(200).send({ success: true, data: userResult });
      })
      .catch((err) => {
        res.status(500).send({ success: false, msg: err.message });
      });
  }
});

module.exports = router;

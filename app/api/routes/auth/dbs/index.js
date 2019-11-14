import {
  checkDBSUser,
  createToken,
  createUser,
} from '../../../controllers/auth/dbs';

const { Router } = require('express');
const router = Router();

router.post('/memberCheck', (req, res) => {
  console.log('memberCheck :: ');
  const { user } = req.body;

  checkDBSUser(user, (result) => {
    res.send(result.data);
  });
});

router.post('/createToken', (req, res) => {
  const { user } = req.body;

  createToken(user, (result) => {
    res.send(result.key);
  });

  // {                                                                                                                                                        16:05:26
  //   result: false,
  //   message: '회원정보를 찾을 수 없습니다.',
  //   key: ''
  // }
});

router.post('/createUser', (req, res) => {
  const { user } = req.body;

  createUser(user, (result) => {
    res.send(result.key);
  });
});

module.exports = router;

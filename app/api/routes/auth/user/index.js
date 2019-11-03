const { Router } = require('express');

const router = Router();

// Mock Users
const users = [{ name: '홍길동' }, { name: '정일영' }];

router.get('/', function(req, res, next) {
  res.json(users);
});

router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;

const { Router } = require('express');
const router = Router();
const Gitlab = require('gitlab').Gitlab;
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// const services = new Gitlab({
//   host: 'http://10.36.13.89',
//   token: '__5uUEPux-qreBuxsJt2',
// });

// 안예솔 - __5uUEPux-qreBuxsJt2

// 프로젝트 브랜치 목록 가져오기
router.get('/getBranchList', (req, res) => {
  const projectId = req.query.projectId;
  let gitlabToken = req.query.gitlabToken;

  // TODO 없애야함
  if (gitlabToken === undefined) {
    gitlabToken = '__5uUEPux-qreBuxsJt2';
  }

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Branches.all(projectId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

// router.get('/removeBranch', (req, res) => {
//   const projectId = req.query.projectId;
//   const branchName = req.query.branchName;
//
//   services.Branches.remove(projectId, branchName)
//     .then((result) => {
//       res.status(200).send({ success: true, data: result });
//     })
//     .catch((err) => {
//       res.status(err.response.status).send({ error: err.description });
//     });
// });

router.post('/createBranch', (req, res) => {
  const projectId = req.body.projectId;
  const branchName = req.body.branchName;
  const ref = req.body.ref;
  let gitlabToken = req.body.gitlabToken;

  // TODO 없애야함
  if (gitlabToken === undefined) {
    gitlabToken = '__5uUEPux-qreBuxsJt2';
  }

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Branches.create(projectId, branchName, ref)
    .then((result) => {
      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

module.exports = router;

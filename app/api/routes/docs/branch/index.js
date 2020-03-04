const { Router } = require('express');
const router = Router();
const Gitlab = require('gitlab').Gitlab;
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// __5uUEPux-qreBuxsJt2 - 10.110.15.133 안예솔 gitlabToken
// -x_eB2WV1oaC876jTPwP - 10.110.15.133 root gitlabToken

/**
 * 프로젝트 브랜치 목록 가져오기
 */
router.get('/getBranchList', (req, res) => {
  const projectId = req.query.projectId;
  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
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

/**
 * 프로젝트 브랜치 생성
 */
router.post('/createBranch', (req, res) => {
  const projectId = req.body.projectId;
  const branchName = req.body.branchName;
  const ref = req.body.ref;
  const gitlabToken = req.body.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
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

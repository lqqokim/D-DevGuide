// mongodb 쓰려면 아래 주석처리한 코드 살리고 models > repository.js 만들면 됨
// import { RepositoryModel } from './../../../models/repository';

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

router.post('/createCommit', (req, res) => {
  const projectId = req.body.projectId;
  const branchName = req.body.branchName;
  const commitMessage = req.body.commitMessage;
  const actions = req.body.actions;
  const gitlabToken = req.body.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Commits.create(projectId, branchName, commitMessage, actions)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/getCommitList', (req, res) => {
  const projectId = req.query.projectId;
  const option = {
    ref_name: req.query.branchName,
  };

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Commits.all(projectId, option)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/getSingleCommit', (req, res) => {
  // const projectId = req.query.projectId;
  const projectId = 5; // TODO 수정 필요
  const sha = '191007';
  // const options = {
  //   recursive: true,
  // };
  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Commits.show(projectId, '1810417fdb4414f2a4a8e98018347afb07103c76')
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/getCommitDiff', (req, res) => {
  const projectId = req.query.projectId;
  const sha = req.query.sha;

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Commits.diff(projectId, sha)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/getReference', (req, res) => {
  const projectId = req.query.projectId;
  const sha = req.query.sha;

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Commits.references(projectId, sha)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

module.exports = router;

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

// 안예솔 - __5uUEPux-qreBuxsJt2

router.get('/getMergeRequestList', (req, res) => {
  const params = {
    projectId: req.query.projectId,
    state: 'opened',
  };

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.MergeRequests.all(params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/createMergeRequest', (req, res) => {
  const projectId = req.query.projectId;
  const sourceBranch = req.query.sourceBranch;
  const targetBranch = req.query.targetBranch;
  const title = req.query.title;
  const option = {
    description: req.query.description,
  };

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.MergeRequests.create(
    projectId,
    sourceBranch,
    targetBranch,
    title,
    option
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/removeMergeRequest', (req, res) => {
  const projectId = req.query.projectId;
  const mergeRequestIId = req.query.mergeRequestIId;

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.MergeRequests.edit(projectId, mergeRequestIId, {
    state_event: 'close',
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/acceptMergeRequest', (req, res) => {
  const projectId = req.query.projectId;
  const mergeRequestIId = req.query.mergeRequestIId;
  const option = { should_remove_source_branch: true };

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.MergeRequests.accept(projectId, mergeRequestIId, option)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        // TODO 메시지 박스 띄우기 (alert 사용 불가 -> alert is not defined 오류 발생)
        // alert('해당 프로젝트에 admin 또는 owner 설정이 필요한 기능입니다.');
      }
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/getChangesData', (req, res) => {
  const projectId = req.query.projectId;
  const mergeRequestIId = req.query.mergeRequestIId;

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.MergeRequests.changes(projectId, mergeRequestIId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});
module.exports = router;

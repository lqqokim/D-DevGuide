// mongodb 쓰려면 아래 주석처리한 코드 살리고 models > repository.js 만들면 됨
// import { RepositoryModel } from './../../../models/repository';

const { Router } = require('express');
const router = Router();
const Gitlab = require('gitlab').Gitlab;
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// __5uUEPux-qreBuxsJt2 - 10.110.15.133 안예솔 gitlabToken
// -x_eB2WV1oaC876jTPwP - 10.110.15.133 root gitlabToken

/**
 * 병합 요청 목록 가져오기
 */
router.get('/getMergeRequestList', (req, res) => {
  const params = {
    projectId: req.query.projectId,
    state: 'opened',
  };

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.MergeRequests.all(params)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ msg: err.description });
    });
});

/**
 * 병합 요청 생성
 */
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
    host: process.env.GITLAB_URL,
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
      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res
        .status(err.response.status)
        .send({ success: false, msg: err.message });
    });
});

/**
 * 병합 요청 삭제
 */
router.get('/removeMergeRequest', (req, res) => {
  const projectId = req.query.projectId;
  const mergeRequestIId = req.query.mergeRequestIId;

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.MergeRequests.edit(projectId, mergeRequestIId, {
    state_event: 'close',
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ msg: err.description });
    });
});

/**
 * 병합 요청 승인
 */
router.get('/acceptMergeRequest', (req, res) => {
  const projectId = req.query.projectId;
  const mergeRequestIId = req.query.mergeRequestIId;
  const option = { should_remove_source_branch: true };

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.MergeRequests.accept(projectId, mergeRequestIId, option)
    .then((result) => {
      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res
        .status(err.response.status)
        .send({ success: false, msg: err.message });
    });
});

/**
 * 병합 요청한 브랜치의 변경 사항 가져오기
 */
router.get('/getChangesData', (req, res) => {
  const projectId = req.query.projectId;
  const mergeRequestIId = req.query.mergeRequestIId;

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.MergeRequests.changes(projectId, mergeRequestIId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ msg: err.description });
    });
});
module.exports = router;

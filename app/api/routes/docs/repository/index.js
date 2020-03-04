// mongodb 쓰려면 아래 주석처리한 코드 살리고 models > repository.js 만들면 됨
// import { RepositoryModel } from './../../../models/repository';
import {
  // eslint-disable-next-line import/named
  gitUpload,
} from './../../../controllers/upload';
const createError = require('http-errors');

const { Router } = require('express');
const router = Router();
const Gitlab = require('gitlab').Gitlab;
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const services = new Gitlab({
  host: process.env.GITLAB_URL,
  token: '-x_eB2WV1oaC876jTPwP',
});

/**
 * 프로젝트의 repository 트리 데이터 가져오기
 */
router.get('/getRepositoryTree', (req, res) => {
  const projectId = req.query.projectId;
  const option = {
    ref: req.query.ref,
    path: req.query.path,
    recursive: true,
  };

  services.Repositories.tree(projectId, option)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

/**
 * 프로젝트 repository 에 있는 file 데이터 가져오기
 */
router.get('/getRepositoryFileData', (req, res, next) => {
  const projectId = req.query.projectId;
  const filePath = req.query.filePath;
  let ref = req.query.ref;

  if (ref === '') {
    ref = 'master';
  }
  services.RepositoryFiles.showRaw(projectId, filePath, ref)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ msg: err.description });
    });
});

/**
 * 브랜치의 변경 내역 가져오기
 */
router.get('/getBranchChangesData', (req, res) => {
  const projectId = req.query.projectId;
  const from = req.query.from;
  const to = req.query.to;
  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.Repositories.compare(projectId, from, to)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

/**
 * repository 에 있는 파일 크기 가져오기
 */
router.get('/getFileSize', (req, res) => {
  const projectId = req.query.projectId;
  const filePath = req.query.filePath;
  const ref = req.query.ref;

  services.RepositoryFiles.show(projectId, filePath, ref)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

/**
 * 개발자문서 내 파일 업로드
 */
router.post('/upload', gitUpload.single('file'), (req, res) => {
  const read = require('read-file');
  const content = read.sync(
    'app/static/gitUpload/' + req.file.filename,
    'base64'
  );
  const opt = {
    encoding: 'base64',
  };
  const projectId = req.body.projectId;
  const branchName = req.body.branchName;
  const uploadPath = req.body.uploadPath;

  req.file.originalname = req.file.originalname.replace(/\s/gi, '_');

  services.RepositoryFiles.create(
    projectId,
    uploadPath + '/' + req.file.originalname,
    branchName,
    content,
    'Upload New File',
    opt
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

/**
 * repository 에 파일 생성
 */
router.post('/createFile', (req, res) => {
  const projectId = req.body.projectId;
  const filePath = req.body.filePath;
  const ref = req.body.ref;
  const commitMessage = req.body.commitMessage;
  services.RepositoryFiles.show(projectId, filePath, ref)
    .then((fileResult) => {
      res.status(200).send({ success: true, data: fileResult });
    })
    .catch((err) => {
      console.error('not found index.md file :: ', err);
      services.RepositoryFiles.create(
        projectId,
        filePath,
        ref,
        '',
        commitMessage
      )
        .then((result) => {
          res.status(200).send({ success: true, data: result });
        })
        .catch((err) => {
          res.status(err.response.status).send({ error: err.description });
        });
    });
});

module.exports = router;

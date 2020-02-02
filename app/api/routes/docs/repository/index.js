// mongodb 쓰려면 아래 주석처리한 코드 살리고 models > repository.js 만들면 됨
// import { RepositoryModel } from './../../../models/repository';
import {
  // eslint-disable-next-line import/named
  gitUpload,
} from './../../../controllers/upload';

const { Router } = require('express');
const router = Router();
const Gitlab = require('gitlab').Gitlab;
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const services = new Gitlab({
  host: 'http://10.110.15.133',
  token: '__5uUEPux-qreBuxsJt2',
});

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

router.get('/getFileNameList', (req, res) => {
  const projectId = req.query.projectId;
  const option = {
    ref: req.query.ref,
    path: req.query.path,
    recursive: false,
  };

  services.Repositories.tree(projectId, option)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/getRepositoryFileData', (req, res) => {
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
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/getBranchChangesData', (req, res) => {
  const projectId = req.query.projectId;
  const from = req.query.from;
  const to = req.query.to;
  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
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

router.post('/upload', gitUpload.single('file'), (req, res) => {
  const read = require('read-file');
  const content = read.sync(
    'app/static/gitUpload/' + req.file.filename,
    'base64'
  );
  const opt = {
    encoding: 'base64',
  };
  const projectId = Number(req.body.projectId);
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

// router.post('/createFile', (req, res) => {
//   services.RepositoryFiles.create(
//     5,
//     'testFolder/test.md',
//     'master',
//     'content 입니다.',
//     'Upload New File'
//   )
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.status(err.response.status).send({ error: err.description });
//     });
// });

module.exports = router;

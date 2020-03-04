import { VersionModel } from './../../../models/version';
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
 * MongoDB 에서 version 리스트 가져오기
 */
router.get('/getVersionList', (req, res) => {
  const productCode = {
    productCode: req.query.productCode,
  };
  VersionModel.find(productCode)
    .sort({ index: 1 })
    .then((versions) => {
      res.status(200).send({ success: true, data: versions });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * Gitlab 프로젝트에 version 생성
 */
router.get('/createVersion', (req, res) => {
  const projectId = req.query.projectId;
  const option = {
    name: req.query.tagName,
    tag_name: req.query.tagName,
    description: req.query.tagDescription,
    ref: req.query.ref,
  };
  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.Releases.create(projectId, option)
    .then((version) => {
      res.status(200).send({ success: true, data: version });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * MongoDB 에 version data 추가
 */
router.post('/insertVersion', (req, res) => {
  const version = req.body;
  const versionModel = new VersionModel(version);

  VersionModel.countDocuments({ productCode: req.body.productCode })
    .then((count) => {
      versionModel.index = count + 1;
      return versionModel.save();
    })
    .then((version) => {
      res.status(200).send({ success: true, data: version });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * Gitlab 에서 version 삭제
 */
router.get('/removeVersion', (req, res) => {
  const projectId = req.query.projectId;
  const tagName = req.query.tagName;

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.Tags.remove(projectId, tagName)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

/**
 * MongoDB 에서 version data 삭제
 */
router.get('/deleteVersion', (req, res) => {
  const version = req.query;

  VersionModel.deleteOne(version)
    .then((versionData) => {
      res.status(200).send({ success: true, data: versionData });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * MongoDB 에서 version 목록 수정
 */
router.put('/updateVersionIndex', (req, res) => {
  const versions = req.body;
  const promises = [];

  // 버전 목록 index 수정
  versions.map((version, index) => {
    promises.push(
      VersionModel.findOneAndUpdate(
        {
          productCode: version.productCode,
          createdAt: version.createdAt,
        },
        { $set: { index: index + 1 } }
      )
    );
  });

  Promise.all(promises)
    .then((versions) => {
      res.status(200).send({ success: true, data: versions });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

module.exports = router;

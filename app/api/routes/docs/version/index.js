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

router.get('/getVersionList', (req, res) => {
  const projectId = req.query.projectId;

  services.Releases.all(projectId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

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
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Releases.create(projectId, option)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/removeVersion', (req, res) => {
  const projectId = req.query.projectId;
  const tagName = req.query.tagName;

  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
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

module.exports = router;

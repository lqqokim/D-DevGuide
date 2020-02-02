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

// 안예솔 - __5uUEPux-qreBuxsJt2

router.get('/devDocSearch', (req, res) => {
  const contents = req.query.contents;
  const projectId = { projectId: Number(req.query.projectId) };

  services.Search.all('blobs', contents, projectId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

module.exports = router;

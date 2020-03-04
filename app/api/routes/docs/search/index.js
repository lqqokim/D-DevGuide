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

// __5uUEPux-qreBuxsJt2 - 안예솔
// -x_eB2WV1oaC876jTPwP - 10.110.15.133 root
// Gyo5UfCbuVQugwB_ryTW - git.comet.duzon.net

/**
 * repository file 에서 검색
 */
router.get('/devDocSearch', (req, res) => {
  const contents = req.query.contents;
  const projectId = { projectId: req.query.projectId };

  services.Search.all('blobs', contents, projectId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

module.exports = router;

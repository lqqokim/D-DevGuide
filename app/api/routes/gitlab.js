import { projects, tree } from '../controllers/gitlab';

const { Router } = require('express');
const router = Router();

router.get('/projects', projects);
router.get('/projects/:id', tree);

module.exports = router;

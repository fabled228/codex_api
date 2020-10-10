import express from 'express';
import projectsController from '../controllers/projects';

const router = express.Router();

router.get('/', projectsController.getAll);

router.post('/', projectsController.create);

router.get('/:projectId', projectsController.get);

router.delete('/:projectId', projectsController.delete);

export default router;

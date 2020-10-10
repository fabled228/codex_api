import express from 'express';
import workspacesController from '../controllers/workspaces';

const router = express.Router();

router.get('/', workspacesController.getAll);

router.post('/', workspacesController.create);

router.get('/:workspaceId', workspacesController.get);

router.delete('/:workspaceId', workspacesController.delete);

export default router;

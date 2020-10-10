import express from 'express';
import serversController from '../controllers/servers';

const router = express.Router();

router.get('/', serversController.getAll);

router.post('/', serversController.create);

router.get('/:serverId', serversController.get);

router.delete('/:serverId', serversController.delete);

export default router;

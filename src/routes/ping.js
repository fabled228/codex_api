import express from 'express';
import PingController from '../controllers/ping';

const router = express.Router();

router.get('/:serverId', PingController.ping);

export default router;

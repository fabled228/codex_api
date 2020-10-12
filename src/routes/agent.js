import express from 'express';
import AgentController from '../controllers/agent';

const router = express.Router();

router.post('/', AgentController.create);

export default router;

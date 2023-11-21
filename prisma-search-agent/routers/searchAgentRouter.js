import express from 'express';
const router = express.Router();
import searchAgentController from '../controllers/searchAgentController.js'; 

router.post('/', (req, res) => {
    return searchAgentController.createSearchAgent(req, res);
});

router.post('/match', (req, res) => {
    return searchAgentController.matchSearchAgent(req, res);
});

router.get('/', (req, res) => {
    return searchAgentController.getAllSearchAgents(req, res);
});

router.get('/send', (req, res) => {
    return searchAgentController.sendEmail(req, res);
});

export default router;

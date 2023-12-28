import express from 'express';
const router = express.Router();
import { verifyToken } from '../services/authMiddleware.js';
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

router.get('/find', verifyToken, (req, res) => {
    return searchAgentController.findSearchAgents(req, res);
  });
  

router.delete('/delete/:id', verifyToken, (req, res) => {
    return searchAgentController.deleteSearchAgent(req, res)
})

router.put('/update/:id', verifyToken, (req, res) => {
    return searchAgentController.updateSearchAgent(req, res)
})

export default router;

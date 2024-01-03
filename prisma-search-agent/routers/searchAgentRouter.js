import express from 'express';
import { verifyToken } from '../services/authMiddleware.js';
import searchAgentController from '../controllers/searchAgentController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger.js';

const router = express.Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * search-agent/:
 *   post:
 *     summary: Create a search agent to discover products based on data analysis.
 *     description: >
 *       This endpoint empowers the creation of a search agent, a sophisticated data-driven entity
 *       designed to explore and uncover products within the vast realm of available data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Search agent configuration for product discovery.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             agentName:
 *               type: string
 *               description: Name of the search agent.
 *             filters:
 *               type: object
 *               description: Criteria for product filtering.
 *               properties:
 *                 category:
 *                   type: string
 *                   description: Desired product category.
 *                 priceRange:
 *                   type: object
 *                   description: Range of acceptable product prices.
 *                   properties:
 *                     min:
 *                       type: number
 *                       description: Minimum price.
 *                     max:
 *                       type: number
 *                       description: Maximum price.
 *             # Add more properties as needed
 *     responses:
 *       200:
 *         description: Search agent successfully created for product discovery.
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               description: Status of the operation.
 *             message:
 *               type: string
 *               description: Additional information about the operation.
 */
router.post('/search-agent', (req, res) => {
  return searchAgentController.createSearchAgent(req, res);
});


  

/**
 * @swagger
 * search-agent/match:
 *   post:
 *     description: Match search agent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Search agent object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Search agent matched successfully
 */
router.post('/match', (req, res) => {
    return searchAgentController.matchSearchAgent(req, res);
  });
  

/**
 * @swagger
 * search-agent/:
 *   get:
 *     description: Get all search agents
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Search agents retrieved successfully
 */
router.get('/', (req, res) => {
    return searchAgentController.getAllSearchAgents(req, res);
  });

/**
 * @swagger
 * search-agent/find:
 *   get:
 *     description: Find search agents (requires token)
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Search agents found successfully
 */
router.get('/find', verifyToken, (req, res) => {
    return searchAgentController.findSearchAgents(req, res);
  });

/**
 * @swagger
 * search-agent/delete/{id}:
 *   delete:
 *     description: Delete a search agent by ID (requires token)
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Search agent ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Search agent deleted successfully
 */
router.delete('/delete/:id', verifyToken, (req, res) => {
    return searchAgentController.deleteSearchAgent(req, res);
  });
  
  /**
   * @swagger
   * search-agent/update/{id}:
   *   put:
   *     description: Update a search agent by ID (requires token)
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Search agent ID
   *         in: path
   *         required: true
   *         type: string
   *       - name: body
   *         description: Search agent object
   *         in: body
   *         required: true
   *     responses:
   *       200:
   *         description: Search agent updated successfully
   */
  router.put('/update/:id', verifyToken, (req, res) => {
    return searchAgentController.updateSearchAgent(req, res);
  });

export default router;

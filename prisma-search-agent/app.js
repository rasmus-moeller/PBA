import express from 'express';
import cors from 'cors';
const app = express();
import searchAgentRouter from './routers/searchAgentRouter.js';

app.use(cors());
app.use(express.json());

app.use('/search-agent', searchAgentRouter);
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

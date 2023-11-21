import express from 'express';
const app = express();
import searchAgentRouter from './routers/searchAgentRouter.js';

app.use(express.json());

app.use('/search-agent', searchAgentRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

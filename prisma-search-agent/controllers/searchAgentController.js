import searchAgentService from'../services/searchAgentService.js';
import  klaviyoService from '../services/klaviyoService.js'
import sendGridService from '../services/sendGridService.js'

async function createSearchAgent(req, res) {
  try {
    const { phone, email, name, filter } = req.body;
    const cleanedFilter = searchAgentService.cleanFilter(filter);
    const createdSearchAgent = await searchAgentService.createSearchAgent(phone, email, name, cleanedFilter);
    let searchAgentCreated = false;
    let userAddedToKlaviyo = false
    if (createdSearchAgent.id) {
        searchAgentCreated = true;
        const addUserToKlaviyoList = await klaviyoService.addUserToList(email, name)
        if (addUserToKlaviyoList !== 'Member already in list') {
            userAddedToKlaviyo = true
        }
    }
    const response = {isSearchAgentCreated: searchAgentCreated, isUserAddedToKlaviyo: userAddedToKlaviyo}
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllSearchAgents(req, res) {
  try {
    const searchAgents = await searchAgentService.getAllSearchAgents();

    res.json(searchAgents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function matchSearchAgent(req, res){
    try {
    const searchAgents = await searchAgentService.getAllSearchAgents();
    const searchAgentsWithParsedFilter = searchAgents.map((searchAgent) => ({
      ...searchAgent,
      filter: searchAgent.filter,
    }));
    const { products} = req.body;

    const agentsWithAMatch = searchAgentService.filterProductsForSearchAgents(searchAgentsWithParsedFilter, products)

    res.json(agentsWithAMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function sendEmail(req, res){
    const mail = await sendGridService.sendMail('rasm937k@gmail.com')

    return res.json(mail)
}

export default{
  createSearchAgent,
  getAllSearchAgents,
  matchSearchAgent,
  sendEmail
};
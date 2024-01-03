import searchAgentService from'../services/searchAgentService.js';
import  klaviyoService from '../services/klaviyoService.js'
import sendGridService from '../services/sendGridService.js'
import fetch from 'node-fetch';

async function createSearchAgent(req, res) {
  try {
    const { phone, email, name, filter } = req.body;
    const cleanedFilter = searchAgentService.cleanFilter(filter);
    const createdSearchAgent = await searchAgentService.createSearchAgent(phone, email, name, cleanedFilter);
    let searchAgentCreated = false;
    let userAddedToKlaviyo = false;
    if (createdSearchAgent.id) {
        searchAgentCreated = true;
        const addUserToKlaviyoList = await klaviyoService.addUserToList(email, name)
        if (addUserToKlaviyoList !== 'Member already in list') {
            userAddedToKlaviyo = true
        }
        const password = Math.random().toString(36).slice(-12);
        fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })
        .then(response => {
          if (response.ok) {
            sendGridService.sendCreationMail(email, password)
          } else if(response.status === 400){
            console.log("user already exists");
          }else{
            console.error('Registration failed. Status:', response.status);
          }
        })
        .catch(error => console.error('Error:', error));
              
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

const consolidateProductMatches = (data) => {
  let emailToMatches = {};

  data.forEach(item => {
      const userEmail = item.searchAgent.email;
      const userProducts = item.filteredProducts;

      if (!emailToMatches[userEmail]) {
          emailToMatches[userEmail] = {
              email: userEmail,
              matchedProducts: []
          };
      }

      emailToMatches[userEmail].matchedProducts = emailToMatches[userEmail].matchedProducts.concat(userProducts);
  });

  return Object.values(emailToMatches);
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

    const filteredAgentMatches = consolidateProductMatches(agentsWithAMatch)
    if (agentsWithAMatch.length) {
      await sendGridService.sendMail(filteredAgentMatches, req.body.handle, req.body.image.src)
      res.status(200).json(agentsWithAMatch);
    }else{
      res.status(200).json('No matching search agents');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function findSearchAgents(req, res) {
  const searchAgents = await searchAgentService.getSearchAgentsByMail(req.query.email)

  return res.json(searchAgents)
}

async function deleteSearchAgent(req, res){
  const { id } = req.params
  const searchAgent = await searchAgentService.deleteSearchAgent(Number(id))

  return res.status(200).json(searchAgent)
}

async function updateSearchAgent(req, res){
  const { id } = req.params
  const searchAgent = await searchAgentService.updateSearchAgent(Number(id), req.body.filter)

  return res.status(200).json(searchAgent)
}

export default{
  createSearchAgent,
  getAllSearchAgents,
  matchSearchAgent,
  findSearchAgents,
  deleteSearchAgent,
  updateSearchAgent
};
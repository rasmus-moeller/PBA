import prisma from '../db/index.js'; 


async function createSearchAgent(phone, email, name, filter) {
  const createdSearchAgent = await prisma.Agent.create({
    data: {
      phone,
      email,
      name,
      filter,
    },
  });
  return createdSearchAgent;
}

async function getAllSearchAgents() {
  const searchAgents = await prisma.Agent.findMany();
  return searchAgents;
}

async function getSearchAgentsByMail(email){
  const searchAgents = await prisma.Agent.findMany({
    where: {
      email: email,
    },
  });

  return searchAgents
}

function cleanFilter(filter) {
  return Object.keys(filter).reduce((cleanedFilter, key) => {
    const value = filter[key];
    if (value !== '' && value !== undefined && value !== null) {
      cleanedFilter[key] = value;
    }
    return cleanedFilter;
  }, {});
}

function filterProductsForSearchAgents(searchAgents, products) {
  const filteredProductsBySearchAgent = [];

  for (const searchAgent of searchAgents) {
    const filteredProducts = products.filter((product) => {
      for (const [key, value] of Object.entries(searchAgent.filter)) {
        if(!product[key]){
            return false;
        }

        if (Array.isArray(value)) {
            if (!value.includes(product[key])) {
            return false;
          }
        } else if(value?.from && value?.to){
            if(value.from > product[key] && value.to < product[key] || value.from === value.to && product[key] !== value.from){
                return false;
            }
        }else if (product[key].toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      }
      return true;
    });

    if (filteredProducts.length > 0) {
      filteredProductsBySearchAgent.push({ searchAgent, filteredProducts });
    }
  }
  return filteredProductsBySearchAgent;
}

async function deleteSearchAgent(id) {
  try {
    const deletedSearchAgent = await prisma.Agent.delete({
      where: {
        id: id,
      },
    });
    return deletedSearchAgent;
  } catch (error) {
    // Handle errors if any
    console.error('Error deleting search agent:', error);
    throw error;
  }
}

async function updateSearchAgent(id, filter){

  const updatedAgent = await prisma.Agent.update({
    where: {
      id: id,
    },
    data: {
      filter: filter,
    },
  });

  return updatedAgent
}



export default {
  createSearchAgent,
  getAllSearchAgents,
  cleanFilter,
  filterProductsForSearchAgents,
  getSearchAgentsByMail,
  deleteSearchAgent,
  updateSearchAgent
};
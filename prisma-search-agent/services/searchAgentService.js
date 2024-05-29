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
  console.log(email);
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

function cleanProducts(products) {
    return products.map(obj => {
        // Initialize an empty object for metafieldsRefactored
        const metafieldsRefactored = {};
        
        // Populate metafieldsRefactored with key-value pairs from metafields array
        obj.metafields.forEach(metafield => {
            metafieldsRefactored[metafield.key] = metafield.value;
        });
        
        // Add metafieldsRefactored to the original object
        return {
            ...obj,
            metafieldsRefactored
        };
    });
}

function filterProductsForSearchAgents(searchAgents, products) {
  const filteredProductsBySearchAgent = [];

  for (const searchAgent of searchAgents) {
    const filteredProducts = products.filter((product) => {
      for (const [key, value] of Object.entries(searchAgent.filter)) {
        if (!product.metafieldsRefactored[key]) {
          return false;
        }

        let productValue = product.metafieldsRefactored[key];
        let searchValue = value;

        // Check if the value is a string and convert both to lowercase
        if (typeof productValue === 'string' && typeof searchValue === 'string') {
          productValue = productValue.toLowerCase();
          searchValue = searchValue.toLowerCase();
        }

        if (Array.isArray(value)) {
          if (!value.includes(productValue)) {
            return false;
          }
        } else if (searchValue?.from && searchValue?.to) {
          if (
            searchValue.from > productValue &&
            searchValue.to < productValue ||
            searchValue.from === searchValue.to && productValue !== searchValue.from
          ) {
            return false;
          }
        } else if (productValue !== searchValue) {
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
  updateSearchAgent,
  cleanProducts
};
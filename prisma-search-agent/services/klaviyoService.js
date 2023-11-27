import axios from 'axios';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function addUserToList(email, name) {

const memberAlreadyAdded = await memberIsInList(email);
    if (memberAlreadyAdded) {
        return Promise.resolve('Member already in list');
    }
  const body = {
    profiles: [{email, first_name: name}],
  };

  try {
    const response = await axios.post(
      `https://a.klaviyo.com/api/v2/list/VRDe23/members?api_key=${process.env.KLAVIYO_API_KEY}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

const memberIsInList = async (email) => {
  try {
    const url = `https://a.klaviyo.com/api/v2/list/VRDe23/members?`;
  
    const body = {
            emails: [email],
            api_key: process.env.KLAVIYO_API_KEY,
        };
    const params = new URLSearchParams(body);
    const urlWithParams = url + params
    const response = await axios.get(urlWithParams);

    if (Array.isArray(response.data)) {
      return response.data.length !== 0;
    }

    if (response.data.detail) {
      return false;
    }

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/*const getTemplate = async () => {
  try {
    const url = 'https://a.klaviyo.com/api/templates/SSKSj4';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        revision: '2023-09-15',
        Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`
      }
    };

    const response = await fetch(url, options);
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error(error);
  }
};

const cloneTemplate = async () => {
    try {
        const cloneUrl = 'https://a.klaviyo.com/api/template-clone/'
    const url = 'https://a.klaviyo.com/api/templates/SSKSj4';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        revision: '2023-09-15',
        'content-type': 'application/json',
        Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_API_KEY}`
      },
      body: JSON.stringify({data: {type: 'template', id: "SSKSj4", attributes: {name: 'Clone of Monthly Newsletter Template'}}})
    };

    const response = await fetch(cloneUrl, options);
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error(error);
  }
}*/

export default {
  addUserToList,
  // getTemplate,
  // cloneTemplate
};

import { getToken } from './auth.js';

const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://se-project-express-476617.uc.r.appspot.com"
  : "http://localhost:3001";
  
// Public GET - fetch all items
const getItems = () => {
  return fetch(`${baseUrl}/items?t=${Date.now()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  })
    .then((res) => {
      console.log('GET /items response status:', res.status);
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      console.log('Fetched items:', data);
      return data;
    });
};

// POST - add a new item (requires auth)
const addItem = (item) => {
  const token = getToken();
  if (!token) return Promise.reject('No token found');

  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then((res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)));
};

// DELETE - delete an item (requires auth)
const deleteItem = (id) => {
  const token = getToken();
  if (!token) return Promise.reject('No token found');

  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)));
};

export { getItems, addItem, deleteItem };

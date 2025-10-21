import { getToken } from './auth.js';

const baseUrl = "http://localhost:3001";

// Add an item (requires auth)
const addItem = (item) => {
  const token = getToken();
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(res =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

// Get all items
const getItems = () => {
  return fetch(`${baseUrl}/items?t=${Date.now()}`, {  // Add timestamp to prevent caching
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    },
  }).then((res) => {
    console.log("Response status:", res.status);
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }).then(response => {
    console.log("Raw response from server:", response);
    return response; 
  });
};

// Delete an item (requires auth)
const deleteItem = (id) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(res =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

export { addItem, getItems, deleteItem };

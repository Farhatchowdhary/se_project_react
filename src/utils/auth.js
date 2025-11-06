const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// signup
export const register = (name, avatar, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// signin
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// get user info
export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// token helpers
export const getToken = () => localStorage.getItem("jwt");
export const removeToken = () => localStorage.removeItem("jwt");

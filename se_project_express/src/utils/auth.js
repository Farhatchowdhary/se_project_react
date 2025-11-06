// signup
export const register = (name, avatar, email, password) => {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

// /signin 
export const authorize = (email, password) => {
  return fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

// /users/me for token validation
export const getUserInfo = (token) => {
  return fetch("http://localhost:3001/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  })
  .then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

// Helper function to get token from localStorage
export const getToken = () => {
  return localStorage.getItem("jwt");
};

// Helper function to remove token from localStorage (logout)
export const removeToken = () => {
  localStorage.removeItem("jwt");
};


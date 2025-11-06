const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://se-project-express-476617.uc.r.appspot.com"
  : "http://localhost:3001";

// signup
export const register = (name, avatar, email, password) => {
return fetch(`${baseUrl}/signup`, {
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
  return fetch(`${baseUrl}/signin`, {
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
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
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

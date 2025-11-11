const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://se-project-express-476617.uc.r.appspot.com/api"
  : "http://localhost:3001/api";

// signup
export const register = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// signin
export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// get user info
export const getUserInfo = (token = getToken()) => {
  if (!token) return Promise.resolve(null);

  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  .then((res) => {
    if (res.status === 403) {
      removeToken();
      return null;
    }
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  })
  .catch((err) => {
    console.error("Error fetching user info:", err);
    return null;
  });
};

// token helpers
export const getToken = () => localStorage.getItem("jwt");
export const removeToken = () => localStorage.removeItem("jwt");

const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://se-project-express-476617.uc.r.appspot.com/api"
  : "http://localhost:3001";

// signup
export const register = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {  // ✅ added missing comma
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

// signin
export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {  // ✅ added missing comma
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};



export const getUserInfo = (token = getToken()) => {
  if (!token) return Promise.resolve(null); // no token, just return null

  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  .then((res) => {
    if (res.status === 403) {
      console.warn("⚠️ Token invalid or expired");
      removeToken(); // optional: remove invalid token
      return null;
    }
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  })
  .catch((err) => {
    console.error("Error fetching user info:", err);
    return null; // silently return null
  });
};

// token helpers
export const getToken = () => localStorage.getItem("jwt");
export const removeToken = () => localStorage.removeItem("jwt");

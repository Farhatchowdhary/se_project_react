# WTWR (What to Wear?) - Full Stack Application

WTWR (What to Wear?) is a full-stack web application that helps users decide what to wear based on current weather conditions. The app provides personalized clothing recommendations by analyzing real-time weather data and allowing users to manage their personal wardrobe.

---

## Live Demo

- **Frontend (React App):** [https://Farhatchowdhary.github.io/se_project_react/](https://Farhatchowdhary.github.io/se_project_react/)

- **Backend (API Server):** [https://seprojectexpress-production.up.railway.app](https://seprojectexpress-production.up.railway.app)

- **Frontend Repository:** [https://github.com/Farhatchowdhary/se_project_react](https://github.com/Farhatchowdhary/se_project_react)

- **Backend Repository:** [https://github.com/Farhatchowdhary/se_project_express](https://github.com/Farhatchowdhary/se_project_express)

- **Project Pitch Video:** [Watch Here](https://www.loom.com/share/b09ebc0dc9cf48a295f99844e015454f?sid=979881f2-b374-45e3-8ffa-0254988f3c4a)

---

## Key Features

- **Weather Integration:** Fetches real-time weather data for clothing recommendations.

- **User Authentication:** Secure registration and login system with JWT.

- **Personal Wardrobe:** Users can add, edit, and delete their own clothing items.

- **Interactive Features:** Like/unlike clothing items with persistent state.

- **Profile Management:** Update user profile information.

- **Responsive Design:** Works on desktop and mobile devices.

---

## Tech Stack

### Frontend

- React.js
- HTML5, CSS3, JavaScript (ES6+)
- Vite (build tool)
- React Router for navigation

### Backend

- Node.js
- Express.js RESTful API
- MongoDB & Mongoose
- Authentication: JWT, bcryptjs
- Logging: Winston & express-winston
- Validation: Celebrate & validator

### Deployment & DevOps

- Frontend: GitHub Pages
- Backend: Railway
- SSL/TLS encryption
- PM2 for process management
- Git for version control

### Development Tools

- ESLint & Prettier for code quality
- dotenv for environment variables
- json-server for mock APIs (optional during development)

---

## Installation & Local Setup

### Prerequisites

- Node.js (v14+)
- MongoDB (running locally)
- Git

### Environment Variables

Create a `.env` file in the root directory of your backend project:

```bash
NODE_ENV=production
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb://localhost:27017/wtwr_db
```


### Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/Farhatchowdhary/se_project_express.git
cd se_project_express
```

2. Install dependencies:
 ```bash
npm install
```


3. Start the server:
npm start

Frontend Setup
1. Clone the frontend repository:
git clone https://github.com/Farhatchowdhary/se_project_react.git
cd se_project_react

2. Install dependencies:
npm install

3. Start the development server:
npm run dev
The app will be available at http://localhost:5173



Project Pitch
Check out [this video](https://www.loom.com/share/...)(https://www.loom.com/looms/videos)
where I explain the project, its features, and challenges I faced while building it.



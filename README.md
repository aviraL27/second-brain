# Second Brain

A minimalist, literature-inspired personal knowledge storage application built with the MERN stack (MongoDB, Express, React, Node.js). Second Brain allows you to seamlessly store, organize, and retrieve your thoughts and knowledge with a robust backend and a clean, focused user interface.

## Features

- **Robust Authentication**: Secure user login and registration using JSON Web Tokens (JWT) and Bcrypt for password hashing.
- **Knowledge Management**: Full CRUD (Create, Read, Update, Delete) operations for your notes and knowledge items.
- **Full-Text Search**: Quickly find the information you need across your entire knowledge base.
- **Minimalist UI**: A clean, literature-inspired, and distraction-free frontend UI designed for focus and readability.
- **Responsive Design**: Accessible across devices for capturing thoughts on the go.

## Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Next Generation Frontend Tooling
- **React Router DOM** - Declarative routing
- **Axios** - Promise-based HTTP client
- **Lucide React** - Beautiful and consistent icons

### Backend
- **Node.js & Express** - Fast, unopinionated, minimalist web framework
- **MongoDB & Mongoose** - NoSQL database and elegant object modeling
- **JSON Web Tokens (JWT)** - Secure authentication mechanism
- **Bcrypt.js** - Password hashing function

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (Local instance or MongoDB Atlas connection string)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd second-brain
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory if required by your API client (e.g., `VITE_API_URL=http://localhost:5000`).
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:5173`.

## Project Structure

- `/backend`: Contains the Express server, Mongoose models, authentication routes, and controllers.
- `/frontend`: Contains the Vite-powered React application, UI components, API clients, and views.

## License

This project is licensed under the ISC License.

# Tasky - MERN Stack Task Management App

Tasky is a web application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to manage their tasks by adding, updating (marking as completed or not), and deleting them. The app also features user authentication to secure task management for each individual user.

Both frontend and backend deployed on [Render](https://render.com/).

Take a look 👉 [Website](https://tasky-7jcp.onrender.com) 

## Features

- User Registration: Users can sign up for a new account by providing their first name, last name, email, and password.

- User Login: Existing users can log in to the app using their registered email and password.

- Task Management: Users can add, update, and delete their tasks.

- Task Completion: Users can mark their tasks as completed or not.

## Technologies Used

- Frontend: React.js, Vite.js, Axios
- Backend: Node.js, Express.js, Cors
- Database: MongoDB
- User Authentication: JWT (JSON Web Tokens), Bcrypt

## Some Images

### Sign Up Page
![Sign Up](https://github.com/rodrigosousa11/tasky-todo-mern-app/assets/96240973/eb38388c-9665-4409-97eb-77d481a36994)
### Sign In Page
![Sign In](https://github.com/rodrigosousa11/tasky-todo-mern-app/assets/96240973/f362d16d-72d4-4f69-90b1-a6fbbcad34d2)
### Tasks Page
![Tasks Page](https://github.com/rodrigosousa11/tasky-todo-mern-app/assets/96240973/a1ee4086-26e5-4895-b7d5-021889e6ffd5)

## Prerequisites

Before running the project locally, ensure you have the following installed:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Getting Started

1. Clone the repository:

```md
git clone https://github.com/rodrigosousa11/tasky-todo-mern-app.git
cd tasky
```

2. Install dependencies for both frontend and backend:

```md
cd client
npm install
```

```md
cd server
npm install
```

3. Configure Environment Variables:

Create a .env file in the server directory and set the following environment variables:

```md
MONGO=your-mongodb-uri
JWT=your-jwt-secret
PORT=localhost-port
```

Replace your-mongodb-uri with your MongoDB connection URI and your-jwt-secret with a random string used for JWT token encryption.

4. Run the Development Servers:
```md
# Terminal 1 - Frontend
cd client
npm run dev
```
```md
# Terminal 2 - Backend
cd client
npm start
```

5. Open your browser and access the app.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)





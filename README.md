# Vehicle Rental Booking System

## Project Setup

### Prerequisites
- Node.js (v14.x or higher) is required to run the project.

---

### Backend Setup

1. **Clone the repository to your local machine:**
  git clone https://github.com/DarshitAkbari57/health-tracker

2. **Navigate to the backend folder:**
  cd backend

3. **Install the necessary dependencies:**
  npm install

4. **Set up the database:**
- Ensure your database is properly configured and that the necessary tables and seed data are included in the migration files.

5. **Set up environment variables:**
- There is .env.example file, need to create .env file with actual credentials

6. **Set up tables by using migrations:**
  npx sequelize-cli db:migrate

7. **Start the backend server:**
  npm start
  
The backend will run on [http://localhost:3000](http://localhost:3000).

---

### Frontend Setup

1. **Navigate to the frontend folder:**
  cd frontend

2. **Install the necessary dependencies:**
  npm install

3. **Set up environment variables:**
- There is .env.example file, need to create .env file with actual credentials

4. **Start the frontend server:**
  npm start
  The frontend will run on [http://localhost:3001](http://localhost:3001).


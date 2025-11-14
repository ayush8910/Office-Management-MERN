# Office Management System (MERN)

A simple Office Management System built using Node.js, Express, MongoDB, and React (Vite). The project includes basic CRUD for departments and employees, supervisor assignment, and country → state → city selection using an external API.

## Features
- Add, view, and delete departments  
- Add, edit, and delete employees  
- Assign department and supervisor  
- Search, filter, and pagination on employee list  
- Dynamic Country/State/City selection  
- Simple frontend built with React + Vite

## Setup

### Backend
```
cd backend
npm install
# create .env file add PORT = 5000 and MONGODB_URI = your_MongoDB_URI
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## API Endpoints

### Departments
- GET /api/departments  
- POST /api/departments  
- DELETE /api/departments/:id  

### Employees
- GET /api/employees  
- POST /api/employees  
- GET /api/employees/:id  
- PUT /api/employees/:id  
- DELETE /api/employees/:id  


## Notes
This project is made for practice and assignment purposes to understand MERN stack basics, API handling, and frontend-backend integration.

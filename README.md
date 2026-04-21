# Student Management System Backend

A robust, clean-architecture backend for managing student records, built with Node.js, Express.js, and MongoDB.

## 🚀 Features
- **Clean Architecture**: Separated layers for Routes, Controllers, Services, and Models.
- **Persistent Storage**: Integrated with MongoDB Atlas using Mongoose.
- **Advanced CRUD**: Complete create, read, update, and delete operations.
- **Filtering & Pagination**: Search students by name and paginate results for performance.
- **Robust Error Handling**: Specialized middleware to handle Mongoose and API errors.
- **Environment Management**: Secure configuration using `dotenv`.

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Environment**: Dotenv

## 📋 Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas Account

## ⚙️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Student-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory (using `.env.example` as a template) and add your MongoDB Atlas URI:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_atlas_connection_string
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Student Endpoints
| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/students` | Get all students | `name` (search), `page`, `limit` |
| **POST** | `/api/students` | Create a student | - |
| **GET** | `/api/students/:id` | Get student by ID | - |
| **PUT** | `/api/students/:id` | Update student | - |
| **DELETE** | `/api/students/:id` | Delete student | - |

### Example Query
`GET /api/students?name=John&page=1&limit=5`

## 🧪 Testing with Postman
1. Set the URL to `http://localhost:3000/api/students`.
2. For **POST** and **PUT**, set the `Content-Type` header to `application/json`.
3. Use various query parameters to test search and pagination.

## 📁 Project Structure
```text
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request/Response handling
│   ├── middlewares/     # Logging, validation, and error handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   └── services/        # Business logic
├── .env                 # Environment variables (secret)
├── server.js            # Entry point
└── package.json         # Dependencies and scripts
```

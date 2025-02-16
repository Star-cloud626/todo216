# MERN Stack Developer Technical Assignment with PostgreSQL and Kafka

## Objective
This project demonstrates the design and implementation of a scalable full-stack Task Management System using Express, Next.js, Node.js, PostgreSQL, and Kafka. The application integrates real-time event-driven architecture, secure user authentication, and a responsive dashboard.

## Project Description
**Task Management System** with core features:

1. **User Registration and Login**
   - JWT-based authentication.
   - User registration and login functionalities.

2. **Task Management**
   - CRUD operations for tasks.
   - Task fields: Title, Description, Priority, Status, Due Date, Assigned_to, Created_by.

3. **Real-Time Notifications with Kafka**
   - Kafka producers publish task update events.
   - Kafka consumer listens for events and delivers real-time notifications using Web Sockets.

4. **Frontend Dashboard**
   - Responsive Next.js dashboard.
   - Task list with filtering capabilities.
   - Real-time notifications.

## Technical Requirements

### 1. Backend
- **Node.js** with **Express**.
- **PostgreSQL** as the database.
- **Drizzle ORM** or **TypeORM**.
- **Kafka** for event streaming.
- **WebSocket** for real-time notifications.
- **JWT** for secure authentication.

### 2. Frontend
- **Next.js** framework.
- **ShadCN** UI components.
- **WebSocket** integration for real-time updates.

### 3. Database Schema
- **Users Table**
  - `id` (Primary Key)
  - `username` (String)
  - `email` (String)
  - `password` (Hashed String)

- **Tasks Table**
  - `id` (Primary Key)
  - `title` (String)
  - `description` (Text)
  - `priority` (Enum: Low, Medium, High)
  - `status` (Enum: To Do, In Progress, Done)
  - `due_date` (DateTime)
  - `user_id` (Foreign Key to users)

- **Task History Table**
  - `id` (Primary Key)
  - `task_id` (Foreign Key to tasks)
  - `change_type` (String)
  - `previous_value` (JSON)
  - `new_value` (JSON)
  - `timestamp` (DateTime)

### 4. Kafka Integration
- **Producer** for publishing task update events.
- **Consumer** for listening to task events.
- **WebSocket** service to broadcast updates.

### 5. Authentication
- **JWT** tokens for login sessions.
- API access restricted to authenticated users.

### 6. Deployment
- **Docker** for containerization.
- **docker-compose.yml** for PostgreSQL, Kafka, Zookeeper, and the application.

## Installation & Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/Star-cloud626/todo216.git
```


2. **Install dependencies:**
```bash
docker-compose build
```

3. **Start Services:**
```bash
docker-compose up -d
```

## Demo Instructions

1. **User Actions:**
   - Register and log in.
2. **Task Actions:**
   - Create, read, update, and delete tasks.
3. **Real-Time Notifications:**
   - Update task status and observe notifications.
4. **Task History:**
   - Check historical changes in the database.

## Directory Structure
```plaintext
.
├── backend
├── frontend
├── docker-compose.yml
├── .env
└── README.md
```

## Timeline
The project is to be completed within **7 days**.

For any questions, please reach out to boban.


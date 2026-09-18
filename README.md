# Task Management System

A simple web application for creating and managing tasks.

## Technologies Used

* **Next.js** – used to build the web application and API.
* **TypeScript** – used for writing the application code.
* **MySQL** – used to store the tasks.
* **Prisma** – used to connect the application to the MySQL database and manage the database.
* **CSS** – used to style the user interface.

## Features

The application allows users to:

* View all tasks
* Create new tasks
* Edit tasks
* Delete tasks
* Mark tasks as Pending or Completed
* Filter tasks by status
* Set task priority as Low, Medium, or High

## How to Install and Run

### 1. Clone the project

```bash
git clone https://github.com/Briyad37/klab-tech-upskill-coding-challenge-2026.git
cd klab-tech-upskill-coding-challenge-2026
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Set up the database

Create a MySQL database called:

```text
task_management
```
Create a `.env` file in the main project folder.

Add:

```env
DATABASE_URL="your-mysql-database-url"
```

Replace the value with your MySQL database connection URL.

Then run the Prisma migrations:

```bash
npx prisma migrate deploy
```

Generate the Prisma client:

```bash
npx prisma generate
```

### 4. Start the application

For development:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## API Endpoints

The application provides the following REST API endpoints:

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/tasks`     | Get all tasks |
| GET    | `/api/tasks/:id` | Get one task  |
| POST   | `/api/tasks`     | Create a task |
| PUT    | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Tasks can also be filtered by status using:

```text
/api/tasks?status=PENDING
```

or:

```text
/api/tasks?status=COMPLETED
```

## Technical Decisions

I used **Next.js** for both the frontend and backend so that the application could be kept simple and use one project.

I used **Prisma** to make working with the MySQL database easier and to manage database migrations.

The task status and priority use fixed values to keep the data consistent:

* Status: `PENDING` or `COMPLETED`
* Priority: `LOW`, `MEDIUM`, or `HIGH`

The database connection is stored in an environment variable instead of being written directly in the source code.



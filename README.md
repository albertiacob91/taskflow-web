# TaskFlow Web

Frontend web for **TaskFlow**, a project and task management application
built with **React**, **TypeScript**, and **Vite**.

This project consumes the **TaskFlow API** and provides a modern
interface for authentication, project management, task tracking,
comments, and filtering.

------------------------------------------------------------------------

## Features

-   Login with JWT authentication
-   Protected routes
-   Projects dashboard
-   Create projects
-   Project detail page
-   Task listing by project
-   Create tasks
-   Update task status
-   Delete tasks
-   Task filtering by status, priority and search
-   Task comments
-   Edit and delete comments
-   Environment-based API configuration

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React
-   TypeScript
-   Vite

### State & Data Fetching

-   TanStack Query
-   Axios

### Forms & Validation

-   React Hook Form
-   Zod

### Styling

-   Tailwind CSS

------------------------------------------------------------------------

## Project Structure

    src/
     ├── api/         # HTTP clients and API calls
     ├── components/  # Shared UI components
     ├── features/    # Domain features (projects, tasks, comments)
     ├── pages/       # Route pages
     ├── routes/      # Router configuration
     ├── utils/       # Utilities
     └── main.tsx     # App entry point

------------------------------------------------------------------------

## Environment Variables

Create a `.env.local` file in the project root:

    VITE_API_BASE_URL=http://localhost:3000

You can use `.env.example` as reference.

------------------------------------------------------------------------

## Installation

``` bash
git clone https://github.com/albertiacob91/taskflow-web.git
cd taskflow-web
npm install
```

------------------------------------------------------------------------

## Run in development

``` bash
npm run dev
```

App will run at:

    http://localhost:5173

------------------------------------------------------------------------

## Build

``` bash
npm run build
```

------------------------------------------------------------------------

## Related Project

This frontend consumes the backend API from **TaskFlow API**.

Repository:

    https://github.com/albertiacob91/taskflow-api

------------------------------------------------------------------------

## Current Version

    v0.10.0

------------------------------------------------------------------------

## Author

**Albert Luis Iacob Istrati**

GitHub:

    https://github.com/albertiacob91

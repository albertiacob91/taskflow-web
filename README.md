# TaskFlow Web

Frontend of **TaskFlow**, a project and task management application
built with **React**, **TypeScript**, and **Vite**.

This client consumes the **TaskFlow API** and provides a modern UI for
authentication, projects, tasks, comments, attachments, members,
activity logs, and task assignment.

------------------------------------------------------------------------

## 🌐 Live Demo

Frontend\
https://taskflow-web-delta.vercel.app

Backend API\
https://taskflow-api-974b.onrender.com

API Documentation\
https://taskflow-api-974b.onrender.com/docs

------------------------------------------------------------------------

## 📸 Screenshots

### Login

![Login](./screenshots/login.png)

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Project Detail

![Project Detail](./screenshots/project-detail-1.png)

### Project Detail (Members, Activity, Filters)

![Project Detail](./screenshots/project-detail-2.png)

### Task Detail

![Task Detail](./screenshots/task-detail.png)

------------------------------------------------------------------------

## 🚀 Features

### Authentication

-   JWT login
-   Protected routes
-   Session persistence

### Projects

-   Project dashboard
-   Create new projects
-   Project member management
-   Member roles (Owner / Member / Viewer)

### Tasks

-   Create tasks
-   Update task status
-   Delete tasks
-   Task filters (status, priority, search)
-   Assign tasks to project members

### Collaboration

-   Comments on tasks
-   Edit and delete comments
-   Attachments on tasks
-   Project activity timeline

### UX

-   Responsive interface
-   Clean component architecture
-   API driven state management

------------------------------------------------------------------------

## 🧰 Tech Stack

### Frontend

-   React
-   TypeScript
-   Vite

### Data Fetching

-   TanStack Query
-   Axios

### Styling

-   Tailwind CSS

### Routing

-   React Router

### State Patterns

-   Server state via React Query
-   Component state via React hooks

------------------------------------------------------------------------

## 📦 Project Architecture

    src/
     ├── api/
     │    ├── auth-api.ts
     │    ├── projects-api.ts
     │    ├── tasks-api.ts
     │    └── http.ts
     │
     ├── app/
     │    └── query-client.ts
     │
     ├── components/
     │    ├── navbar.tsx
     │    ├── avatar.tsx
     │    └── task-badges.tsx
     │
     ├── features/
     │    ├── projects/
     │    ├── tasks/
     │    ├── comments/
     │    └── activity/
     │
     ├── pages/
     │    ├── dashboard-page.tsx
     │    ├── project-detail-page.tsx
     │    └── task-detail-page.tsx
     │
     ├── routes/
     │    └── router.tsx
     │
     ├── main.tsx
     └── App.tsx

The project follows a **feature-based architecture**, grouping hooks,
components and API calls by domain.

------------------------------------------------------------------------

## 🔗 Backend Integration

This frontend consumes the API from:

Repository\
https://github.com/albertiacob91/taskflow-api

Live API\
https://taskflow-api-974b.onrender.com

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create `.env.local`

    VITE_API_BASE_URL=http://localhost:3000

For production:

    VITE_API_BASE_URL=https://taskflow-api-974b.onrender.com

------------------------------------------------------------------------

## ▶️ Installation

Clone repository

    git clone https://github.com/albertiacob91/taskflow-web.git
    cd taskflow-web

Install dependencies

    npm install

------------------------------------------------------------------------

## 💻 Development

Run development server

    npm run dev

Application runs at

    http://localhost:5173

------------------------------------------------------------------------

## 🏗 Build

    npm run build

Preview production build

    npm run preview

------------------------------------------------------------------------

## 🏷 Release

Current version

    v0.21.0

------------------------------------------------------------------------

## 👤 Author

Albert Luis Iacob Istrati

GitHub\
https://github.com/albertiacob91

------------------------------------------------------------------------

## 📄 License

MIT License

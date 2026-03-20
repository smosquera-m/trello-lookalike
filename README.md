# 🚀 Trello Clone - Premium Kanban Board

This is a premium Trello clone, designed with a modern **Glassmorphism** aesthetic. The frontend is built with **React** and the backend is powered by **Laravel 12**, equipped with a **MySQL** database to handle persistent, multi-user production task management seamlessly.

![Application Preview](./src/assets/bg.png)

## ✨ Key Features

- **Drag & Drop**: Intuitive card management system that allows moving tasks between columns or reordering them.
- **Ultra Premium Design**:
  - **Glassmorphism**: Blur and transparency effects on columns and cards.
  - **Abstract Background**: HD image generated specifically for a professional aesthetic.
  - **Micro-animations**: Smooth transitions on hover and when reordering elements.
- **Robust Data Persistence**: Complete migration to a **Laravel + MySQL** backend architecture to support production-ready concurrent user updates, completely replacing isolated `localStorage`.
- **Instant Optimistic Updates**: The frontend leverages Zustand to instantly reflect visual changes while communicating silently with the backend API.
- **Complete Management**:
  - Dynamic creation of new lists (columns) using a seamless inline form.
  - Quick addition of cards within any list.
  - One-click task deletion.

## 🛠️ Technologies Used

| Technology | Usage |
| :--- | :--- |
| **React 18** | Main UI framework. |
| **Laravel 12** | Powerful PHP backend providing a robust RESTful API. |
| **MySQL** | Reliable relational database to store boards, columns, and tasks. |
| **Vite** | Lightning-fast build tool to compile the frontend effortlessly. |
| **@hello-pangea/dnd** | Robust library for Drag & Drop system (modern react-beautiful-dnd fork). |
| **Zustand** | Lightweight global state management configured for optimistic API syncing. |
| **Lucide React** | Set of modern and consistent vector icons. |
| **Vanilla CSS** | Custom styles with CSS variables and modern background filters. |

## 🏗️ Project Structure

```bash
trello-lookalike/
├── api/             # Laravel 12 Backend
│   ├── app/Models/  # Column & Task Eloquent Models
│   ├── routes/      # api.php & web.php
│   └── public/      # Hosts the compiled React app
├── src/             # React Frontend
│   ├── assets/      # Background images and icons
│   ├── components/  # React Components (Board, Column, Card)
│   ├── store.js     # State logic (Zustand + API integration)
│   └── App.jsx      # Main structure and header
└── package.json     # Node dependencies & build scripts
```

## 🚀 Installation and Execution

The project is structured to make development and deployment friction-free. Due to the hybrid nature of the architecture, the React frontend is compiled directly into the Laravel application's explicit root structure.

### 1. Database Setup
1. Open your MySQL client and ensure a database named `trello_lookalike` exists.
2. In the `api` folder, update the `.env` file with your connection info:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trello_lookalike
DB_USERNAME=root
DB_PASSWORD=1234
```

### 2. Backend Initialization
Open a terminal in the `api/` directory:
```bash
cd api
composer install
php artisan migrate
```

### 3. Build the Frontend
Open a terminal in the root `trello-lookalike/` folder and compile the React application explicitly into the Laravel `public` directory:
```bash
npm install
npm run build
cp -r dist/* api/public/
```
*(Note: If you work on Windows, simply copy the contents of the `dist` folder into `api/public/` manually if `cp` is unavailable).*

### 4. Run the Application
You only need a single server pointing to the Laravel backend!
```bash
cd api
php artisan serve
```
Open your browser at [http://127.0.0.1:8000](http://127.0.0.1:8000), and enjoy a fully integrated Laravel + React experience without keeping an `npm run dev` process alive.

---

Developed with ❤️ for a superior task management experience.

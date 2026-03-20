# 🚀 Trello Clone - Premium Kanban Board

This is a premium Trello clone, designed with a modern **Glassmorphism** aesthetic, built with **React**, and optimized for smooth and persistent task management.

![Application Preview](./src/assets/bg.png)

## ✨ Key Features

- **Drag & Drop**: Intuitive card management system that allows moving tasks between columns or reordering them.
- **Ultra Premium Design**:
  - **Glassmorphism**: Blur and transparency effects on columns and cards.
  - **Abstract Background**: HD image generated specifically for a professional aesthetic.
  - **Micro-animations**: Smooth transitions on hover and when reordering elements.
- **Data Persistence**: Integration with `localStorage` through **Zustand**, allowing your changes to be saved automatically without the need for an external database.
- **Complete Management**:
  - Dynamic creation of new lists (columns).
  - Quick addition of cards within any list.
  - One-click task deletion.

## 🛠️ Technologies Used

| Technology | Usage |
| :--- | :--- |
| **React 18** | Main UI framework. |
| **Vite** | Lightning-fast build tool. |
| **@hello-pangea/dnd** | Robust library for Drag & Drop system (modern react-beautiful-dnd fork). |
| **Zustand** | Lightweight and persistent global state management. |
| **Lucide React** | Set of modern and consistent vector icons. |
| **Vanilla CSS** | Custom styles with CSS variables and modern background filters. |

## 🏗️ Project Structure

```bash
src/
├── assets/          # Background images and icons
├── components/      # React Components (Board, Column, Card)
├── store.js         # Core state logic (Zustand + Persist)
├── index.css        # Design system and global styles
└── App.jsx          # Main structure and header
```

## 💡 Highlighted Technical Solutions

### Positioning Correction with React Portals
One of the biggest technical challenges was the conflict between the `backdrop-filter` (glass effect) and the fixed positioning system of dragging. 

To solve this, we implemented **React Portals** in the `Card` component. When a card starts being dragged, it is extracted from the column's structure and rendered directly into the `document.body`. This prevents the stacking context of the blur filter from affecting the card's coordinates, ensuring it always remains precisely under the mouse pointer.

## 🚀 Installation and Execution

To run this project locally, follow these steps:

1.  **Clone or download** this repository.
2.  Open a terminal in the project's root folder.
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open your browser at the address that appears in the terminal (default [http://localhost:5173](http://localhost:5173)).

---

Developed with ❤️ for a superior task management experience.

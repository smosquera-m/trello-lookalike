# 🚀 Trello Clone - Premium Kanban Board

Este es un clon premium de Trello, diseñado con una estética moderna **Glassmorphism**, construido con **React** y optimizado para una gestión de tareas fluida y persistente.

![Preview de la Aplicación](./src/assets/bg.png)

## ✨ Características Principales

- **Arrastrar y Soltar (Drag & Drop)**: Sistema de gestión de tarjetas intuitivo que permite mover tareas entre columnas o reordenarlas.
- **Diseño Ultra Premium**:
  - **Glassmorphism**: Efectos de desenfoque y transparencia en columnas y tarjetas.
  - **Fondo Abstracto**: Imagen HD generada específicamente para una estética profesional.
  - **Micro-animaciones**: Transiciones suaves al pasar el ratón y al reordenar elementos.
- **Persistencia de Datos**: Integración con `localStorage` a través de **Zustand**, lo que permite que tus cambios se guarden automáticamente sin necesidad de una base de datos externa.
- **Gestión Completa**:
  - Creación dinámica de nuevas listas (columnas).
  - Adición rápida de tarjetas dentro de cualquier lista.
  - Eliminación de tareas con un solo clic.

## 🛠️ Tecnologías Aplicadas

| Tecnología | Uso |
| :--- | :--- |
| **React 18** | Framework principal para la interfaz de usuario. |
| **Vite** | Herramienta de construcción ultrarrápida (Build Tool). |
| **@hello-pangea/dnd** | Librería robusta para el sistema de Drag & Drop (fork moderno de react-beautiful-dnd). |
| **Zustand** | Gestión de estado global ligera y persistente. |
| **Lucide React** | Set de iconos vectoriales modernos y consistentes. |
| **Vanilla CSS** | Estilos personalizados con variables CSS y filtros de fondo modernos. |

## 🏗️ Estructura del Proyecto

```bash
src/
├── assets/          # Imágenes de fondo e iconos
├── components/      # Componentes de React (Board, Column, Card)
├── store.js         # Lógica central del estado (Zustand + Persist)
├── index.css        # Sistema de diseño y estilos globales
└── App.jsx          # Estructura principal y cabecera
```

## 💡 Soluciones Técnicas Destacadas

### Corrección de Posicionamiento con React Portals
Uno de los mayores retos técnicos fue el conflicto entre el `backdrop-filter` (efecto de cristal) y el sistema de posicionamiento fijo del arrastre. 

Para solucionarlo, implementamos **React Portals** en el componente `Card`. Cuando una tarjeta comienza a ser arrastrada, se extrae de la estructura de la columna y se renderiza directamente en el `document.body`. Esto evita que el contexto de apilamiento del filtro de desenfoque afecte a las coordenadas de la tarjeta, garantizando que esta permanezca siempre bajo el puntero del ratón de forma precisa.

## 🚀 Instalación y Ejecución

Para ejecutar este proyecto de forma local, sigue estos pasos:

1.  **Clona o descarga** este repositorio.
2.  Abre una terminal en la carpeta raíz del proyecto.
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
5.  Abre tu navegador en la dirección que aparezca en la terminal (por defecto [http://localhost:5173](http://localhost:5173)).

---

Desarrollado con ❤️ para una experiencia de gestión de tareas superior.

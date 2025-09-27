# FoodieApp

Welcome to FoodieApp, a recipe sharing platform built entirely with Manifest.

## Features

- **User Authentication**: Secure sign-up and login for users.
- **Recipe CRUD**: Create, Read, Update, and Delete your own recipes.
- **Image Uploads**: Add a beautiful photo to each recipe, powered by Manifest's built-in file storage.
- **Ownership & Permissions**: Users can only edit or delete their own recipes. All recipes are publicly viewable.
- **Auto-Generated Admin Panel**: A complete admin interface for managing users and recipes is available at `/admin`.

## Tech Stack

- **Backend**: Manifest (auto-generated REST API, database, auth, file storage)
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for all frontend-backend communication

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd foodie-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    The application will start on `http://localhost:5173`.
    ```bash
    npm run dev
    ```

### Demo & Admin Access

- **Demo User**: Click the 'Try Demo User' button to log in with a pre-configured user (`user@manifest.build` / `password`).
- **Admin Panel**: Access the admin panel at `<your-backend-url>/admin`.
- **Admin Credentials**: `admin@manifest.build` / `admin`

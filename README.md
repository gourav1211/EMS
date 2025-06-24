# EMS - Employee Task Management System

EMS is a web application built with React and Vite, designed to manage employee data and tasks efficiently. This project leverages modern web technologies to provide a fast and responsive user experience.

## Features

- **React**: Utilizes React for building the user interface.
- **Vite**: Employs Vite for fast development and build processes.
- **Routing**: Implements client-side routing with `react-router-dom`.
- **State Management**: Manages state effectively using React's built-in hooks and Context API.
- **HTTP Requests**: Uses `axios` for making HTTP requests to the backend.
- **Styling**: Styled with Tailwind CSS for a modern and responsive design.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd EMS
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Setup

#### EMS Frontend

Create a `.env` file in the root of the EMS directory and add your environment variables. For example:
```
VITE_API_URI_BACKEND=http://localhost:5000/api
```

#### Backend

Create a `.env` file in the `backend` directory and add your environment variables. For example:
```
MONGO_URI=mongodb://localhost:27017/ems
PORT=5000
```

### Running the Application

- To start the development server for the frontend:
  ```bash
  npm run dev
  ```

- To start the backend server:
  ```bash
  cd backend
  npm run dev
  ```

## Technologies Used

- **React**: ^18.3.1
- **Vite**: ^6.0.1
- **Axios**: ^1.7.9
- **React Router DOM**: ^7.0.2
- **Tailwind CSS**: ^3.4.16
- **Express**: ^4.19.2
- **MongoDB**: ^6.16.0
- **Mongoose**: ^8.4.1
- **Dotenv**: ^16.4.5

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthContext from './context/AuthContext.jsx';
import TaskContext from './context/TaskContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <TaskContext>
        <App/>
      </TaskContext>
    </AuthContext>
  </BrowserRouter>
)

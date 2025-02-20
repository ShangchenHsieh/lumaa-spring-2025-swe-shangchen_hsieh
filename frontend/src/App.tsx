import { useState, useEffect, ReactNode } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskBoard from "./components/TaskBoard";
import { UserProvider } from './UserContext';
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
};

function App() {

  return (
    <UserProvider>
      <div>
        <Router>
          <div className="app-container">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/taskboard" element={<ProtectedRoute>
                  <TaskBoard />
                </ProtectedRoute>}></Route>
              </Routes>
            </main>
          </div>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

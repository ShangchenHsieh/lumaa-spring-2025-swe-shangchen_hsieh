import React, { useEffect, useState } from "react";
import Task from "./Task";
import "./Component.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface TaskType {
    id: number;
    title: string;
    description: string;
    is_complete: boolean;
}

const TaskBoard = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found, redirecting to login...");
                    window.location.href = "/login"; // Redirect to login if no token
                    return;
                }

                const response = await fetch(`${BACKEND_URL}/tasks`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }

                const data: TaskType[] = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <div className="task-board">
            <button onClick={handleLogout} className="logout-button">Logout</button>

            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))
            ) : (
                <p>No tasks found</p>
            )}
        </div>
    );
};

export default TaskBoard;

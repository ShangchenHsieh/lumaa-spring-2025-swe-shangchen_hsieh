import React, { useState, useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface TaskType {
    id: number;
    title: string;
    description: string;
    is_complete: boolean;
}

const TaskBoard: React.FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_URL}/tasks`, {
                headers: { "Authorization": `Bearer ${token}` },
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

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-board">
            <TaskForm />
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskBoard;

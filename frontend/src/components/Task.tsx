import React, { useState } from "react";
import "./TaskComponent.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface TaskProps {
    task: {
        id: number;
        title: string;
        description: string;
        is_complete: boolean;
    };
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [isComplete, setIsComplete] = useState(task.is_complete);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_URL}/tasks/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    is_complete: isComplete,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            alert("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Error updating task");
        }
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_URL}/tasks/${task.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            alert("Task deleted successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Error deleting task");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleUpdate} className="form">
                <div className="form-group">
                    <label htmlFor={`title-${task.id}`}>Title</label>
                    <input
                        type="text"
                        id={`title-${task.id}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`description-${task.id}`}>Description</label>
                    <input
                        type="text"
                        id={`description-${task.id}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor={`status-${task.id}`}>Status</label>
                    <select
                        id={`status-${task.id}`}
                        value={isComplete ? "Completed" : "In Progress"}
                        onChange={(e) => setIsComplete(e.target.value === "Completed")}
                    >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="button-group">
                    <button type="submit">Update</button>
                    <button type="button" onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </div>
    );
};

export default Task;

import React, { useState } from "react";
import "./TaskComponent.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TaskForm: React.FC<{ onTaskCreated?: () => void }> = ({ onTaskCreated = () => { } }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${BACKEND_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            setTitle("");
            setDescription("");
            onTaskCreated();
            window.location.reload();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div className="task-form-container">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;

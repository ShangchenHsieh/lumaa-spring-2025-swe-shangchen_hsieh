import express from "express";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";

const taskRoutes = express.Router();

/**
 * validate the token with screte value and decode the token & append it to the request body 
 * @param {*} req request from the frontend  
 * @param {*} res response from the backend 
 * @param {*} next 
 * @returns next to move on to the next function 
 */
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Forbidden" });
        req.user = user;
        next();
    });
};

/**
 * get all the tasks belong to a user 
 */
taskRoutes.get("/", authenticateToken, async (req, res) => {
    try {
        const tasks = await pool.query(
            "SELECT * FROM tasks WHERE user_id = $1",
            [req.user.userId]
        );
        res.json(tasks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/**
 * create a new task that belongs to the user
 */
taskRoutes.post("/", authenticateToken, async (req, res) => {
    const { title, description } = req.body;
    try {
        const newTask = await pool.query(
            "INSERT INTO tasks (title, description, is_complete, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, false, req.user.userId]
        );
        res.status(201).json({ "message": "success" });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

/**
 * update a task belong to this user 
 */
taskRoutes.put("/:id", authenticateToken, async (req, res) => {
    const { title, description, is_complete } = req.body;
    const { id } = req.params;

    try {
        const updatedTask = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [title, description, is_complete, id, req.user.userId]
        );

        if (updatedTask.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(updatedTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

/**
 * delete a task belongs to this user 
 */
taskRoutes.delete("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await pool.query(
            "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, req.user.userId]
        );

        if (deletedTask.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default taskRoutes;

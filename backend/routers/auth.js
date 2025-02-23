import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const authRoutes = express.Router();

/**
 * register with username and password, returns a token if successful
 * else return the corresponding error message
 * @param {string} username
 * @param {string} password
 * @returns {json} json object depending on the success of the operation, token if success
 */
authRoutes.post("/register", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please enter your Username and Password' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]
        );


        const jwt_token = jwt.sign(
            { userId: newUser.rows[0].id, username: newUser.rows[0].username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ jwt_token });

    } catch (err) {
        // username already existed
        if (err.code === "23505") {
            res.status(409).json({ error: "Username already exists" });
        } else {
            console.error(err.message);
            res.status(500).send("Server error: Can Not Register");
        }
    }
});


/**
 * login with username and password, returns a token if successful
 * @param {string} username
 * @param {string} password
 * @returns {json} json object depending on the success of the operation, token if success
 */
authRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isValid = await bcrypt.compare(password, user.rows[0].password);

        if (!isValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const jwt_token = jwt.sign(
            { userId: user.rows[0].id, username: user.rows[0].username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ jwt_token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error: Login Fail");
    }
});


export default authRoutes;

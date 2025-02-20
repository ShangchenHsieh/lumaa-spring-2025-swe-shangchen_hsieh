import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";

const { Pool } = pkg;


export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false, // Set to true if using a CA-signed certificate
    },
});


console.log(process.env.DB_USER,
    process.env.DB_HOST,
    process.env.DB_NAME,
    process.env.DB_PASSWORD,
    process.env.DB_PORT,)
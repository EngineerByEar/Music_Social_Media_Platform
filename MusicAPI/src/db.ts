import "dotenv/config";
import mysql from "mysql2/promise"

export const DB = mysql.createPool({
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_DBNAME as string,
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_SECRET as string,
});
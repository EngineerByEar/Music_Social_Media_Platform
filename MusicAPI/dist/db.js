import "dotenv/config";
import mysql from "mysql2/promise";
export const DB = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DBNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_SECRET,
});
//# sourceMappingURL=db.js.map
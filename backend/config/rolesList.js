import pool from "../utils/dbConnection.js";

const [rolesList] = await pool.query(`
    SELECT *
    FROM roles
    `);

export default rolesList;
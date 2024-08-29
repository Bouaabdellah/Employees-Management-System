import pool from "../utils/dbConnection.js";

const [branchsList] = await pool.query(`
    SELECT *
    FROM branch
    `);

export default branchsList;
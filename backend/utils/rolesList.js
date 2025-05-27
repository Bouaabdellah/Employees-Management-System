import pool from './dbConnection.js';

const [rolesList] = await pool.query(`
    SELECT *
    FROM roles
    `);

export default rolesList;

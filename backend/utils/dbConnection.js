import mysql from 'mysql2';

// making the pooling of our connection
const pool = mysql.createPool({
    user : process.env.user,
    password : process.env.password,
    host : process.env.host,
    database : process.env.database
}).promise();

export default pool;
import pool from "../utils/dbConnection.js";

const exist = async (table,primaryKey,entPrimaryKey) => {
    const [isExist] = await pool.query(`
        SELECT * FROM ${table}
        WHERE ${primaryKey}=?
        `,[entPrimaryKey]);
    return isExist.length;
}

export default exist;
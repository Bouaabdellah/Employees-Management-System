import pool from '../../utils/dbConnection.js';
import exist from '../../utils/exist.js';
import bcrypt from 'bcrypt';

const addEmployee = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      sex,
      birthDay,
      email,
      password,
      mgrID,
      branchID,
      roleID,
      startDay,
      salary,
      is_manager,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !sex ||
      !birthDay ||
      !salary ||
      is_manager === undefined ||
      !email ||
      !password ||
      !branchID ||
      !roleID ||
      !startDay
    )
      return res
        .status(400)
        .json({ message: 'all the information are required' });
    // confirm that mgrID exist
    if (mgrID) {
      const existMGR = await exist('user', 'id', mgrID);
      if (!existMGR)
        return res
          .status(400)
          .json({
            message: `the manager that have id = ${mgrID} don 't exist`,
          });
    }
    // confirm that branch exist
    const existBranch = await exist('branch', 'branch_id', branchID);
    if (!existBranch)
      return res
        .status(400)
        .json({
          message: `the branch that have id = ${branchID} don 't exist`,
        });
    // confirm that role exist
    const existRole = await exist('roles', 'role_id', roleID);
    if (!existRole)
      return res
        .status(400)
        .json({ message: `the role that have id = ${roleID} don 't exist` });
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPWD = await bcrypt.hash(password, salt);
    await pool.query(
      `
            INSERT INTO user(firstname, lastname, sex, birthday,
            start_day, email, user_password, salary, super_id, branch_id, role_id,image_url,is_manager)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,
      [
        firstname,
        lastname,
        sex,
        birthDay,
        startDay,
        email,
        hashedPWD,
        salary,
        mgrID,
        branchID,
        roleID,
        null,
        is_manager,
      ],
    );
    return res
      .status(201)
      .json({
        message: `add the employee ${firstname} ${lastname} with success`,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'internal error' });
  }
};

export default addEmployee;

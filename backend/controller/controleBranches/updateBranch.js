import pool from '../../utils/dbConnection.js';
import exist from '../../utils/exist.js';

const updateBranch = async (req, res) => {
  try {
    const { branchID, branchName, startDay, mgrID } = req.body;
    // if the user don 't enter information
    if (!branchName || !mgrID || !startDay || !branchID)
      return res
        .status(400)
        .json({ message: `don 't have required information` });
    // confirm that branch exist
    const existBranch = await exist('branch', 'branch_id', branchID);
    if (!existBranch)
      return res
        .status(400)
        .json({
          message: `the branch that have id = ${branchID} don 't exist`,
        });
    // confirm that manager exist
    const existMGR = await exist('user', 'id', mgrID);
    if (!existMGR)
      return res
        .status(400)
        .json({ message: `the manager that have id = ${mgrID} don 't exist` });
    let [managerName] = await pool.query(
      `
            SELECT firstname,lastname FROM user
            WHERE id=?
            `,
      [mgrID],
    );
    managerName = managerName[0].firstname + ' ' + managerName[0].lastname;
    await pool.query(
      `
            update branch
            set branch_name=?, mgr_id=?, start_day=?
            `,
      [branchName, mgrID, startDay],
    );
    return res
      .status(200)
      .json({
        message: `update the branch ${branchName} with success, it will managed by ${managerName}`,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'internal error' });
  }
};

export default updateBranch;

import express from 'express';
import handlJWT from '../middleware/verifyJWT.js';
import getRoleID from '../controller/controleRoles/getRoleID.js';
import rolesList from '../utils/rolesList.js';
import handlRoles from '../middleware/verifyRole.js';

const role = express.Router();
const requirementRoles = rolesList.find((ele) => ele.role_name === 'admin');

role.get('/roleID', handlJWT, getRoleID);
role.get(
  '/roleList',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  (req, res) => {
    return res
      .status(200)
      .json({ message: 'get all roles with sucess', rolesList: rolesList });
  },
);

export default role;

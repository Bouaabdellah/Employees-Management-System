import express from 'express';
import handlJWT from '../middleware/verifyJWT.js';
import handlRoles from '../middleware/verifyRole.js';
import rolesList from '../utils/rolesList.js';
import addBranch from '../controller/controleBranches/addBranch.js';
import deleteBranch from '../controller/controleBranches/deleteBranch.js';
import updateBranch from '../controller/controleBranches/updateBranch.js';
import branchsList from '../utils/branchList.js';
import getBranches from '../controller/controleBranches/getBranch.js';

const branch = express.Router();
const requirementRoles = rolesList.find((ele) => ele.role_name === 'admin');

branch.post(
  '/add_branch',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  addBranch,
);
branch.delete(
  '/delete',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  deleteBranch,
);
branch.put(
  '/update',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  updateBranch,
);
branch.get(
  '/get_all',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  branchsList,
);
branch.get(
  '/get_branch',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  getBranches,
);

export default branch;

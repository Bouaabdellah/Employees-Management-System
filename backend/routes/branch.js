import express from 'express';
import pool from '../utils/dbConnection.js';
import handlJWT from '../middleware/verifyJWT.js';
import handlRoles from '../middleware/verifyRole.js';
import rolesList from '../config/rolesList.js';
import addBranch from '../controller/controleBranches/addBranch.js';

const branch = express.Router();
const requirementRoles = rolesList.find(ele => ele.role_name === 'admin');

branch.post('/add',handlJWT,handlRoles(requirementRoles.role_id),addBranch);

export default branch;
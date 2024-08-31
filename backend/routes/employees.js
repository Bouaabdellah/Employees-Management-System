import express from 'express';
import handlJWT from '../middleware/verifyJWT.js';
import handlRoles from '../middleware/verifyRole.js';
import rolesList from '../config/rolesList.js';
import getAllEmployees from '../controller/controleEmployees/getAllEmpl.js';
import getEmployee from '../controller/controleEmployees/getEmployee.js';

const employeesRouter = express.Router();
const requirementRoles = rolesList.find(ele => ele.role_name === 'admin');

employeesRouter.get('/get_all',handlJWT,handlRoles(requirementRoles.role_id),getAllEmployees);
employeesRouter.get('/get_employee',handlJWT,handlRoles(requirementRoles.role_id),getEmployee);

export default employeesRouter;
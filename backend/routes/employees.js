import express from 'express';
import handlJWT from '../middleware/verifyJWT.js';
import handlRoles from '../middleware/verifyRole.js';
import rolesList from '../config/rolesList.js';
import getAllEmployees from '../controller/controleEmployees/getAllEmpl.js';
import getEmployee from '../controller/controleEmployees/getEmployee.js';
import deleteEmployee from '../controller/controleEmployees/deleteEmployee.js';
import addEmployee from '../controller/controleEmployees/addEmployee.js';
import makeMofications from '../controller/controleEmployees/modifyEmp.js';
import getManagers from '../controller/controleEmployees/getmanagers.js';

const employeesRouter = express.Router();
const requirementRoles = rolesList.find(ele => ele.role_name === 'admin');

employeesRouter.get('/get_all',handlJWT,handlRoles(requirementRoles.role_id),getAllEmployees);
employeesRouter.get('/get_employee',handlJWT,handlRoles(requirementRoles.role_id),getEmployee);
employeesRouter.get('/get_managers',handlJWT,handlRoles(requirementRoles.role_id),getManagers);
employeesRouter.delete('/delete',handlJWT,handlRoles(requirementRoles.role_id),deleteEmployee);
employeesRouter.post('/add_employee',handlJWT,handlRoles(requirementRoles.role_id),addEmployee);
employeesRouter.put('/update',handlJWT,handlRoles(requirementRoles.role_id),addEmployee);
employeesRouter.put('/modify',handlJWT,makeMofications);

export default employeesRouter;
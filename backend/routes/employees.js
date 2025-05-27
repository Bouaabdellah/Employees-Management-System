import express from 'express';
import handlJWT from '../middleware/verifyJWT.js';
import handlRoles from '../middleware/verifyRole.js';
import rolesList from '../utils/rolesList.js';
import getAllEmployees from '../controller/controleEmployees/getAllEmpl.js';
import getEmployee from '../controller/controleEmployees/getEmployee.js';
import deleteEmployee from '../controller/controleEmployees/deleteEmployee.js';
import addEmployee from '../controller/controleEmployees/addEmployee.js';
import makeMofications from '../controller/controleEmployees/modifyEmp.js';
import getManagers from '../controller/controleEmployees/getmanagers.js';
import updateEmployee from '../controller/controleEmployees/updateEmployee.js';
import upload from '../utils/upload.js';
import verifyNewImage from '../middleware/verifyNewImage.js';
import memoryUpload from '../utils/storeInMemory.js';

const employeesRouter = express.Router();
const requirementRoles = rolesList.find((ele) => ele.role_name === 'admin');

employeesRouter.get(
  '/get_all',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  getAllEmployees,
);
employeesRouter.get('/get_employee', handlJWT, getEmployee);
employeesRouter.get(
  '/get_managers',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  getManagers,
);
employeesRouter.delete(
  '/delete',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  deleteEmployee,
);
employeesRouter.post(
  '/add_employee',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  addEmployee,
);
employeesRouter.put(
  '/update',
  handlJWT,
  handlRoles(requirementRoles.role_id),
  updateEmployee,
);
employeesRouter.put(
  '/modify',
  handlJWT,
  memoryUpload.single('file'),
  verifyNewImage,
  upload,
  makeMofications,
);

export default employeesRouter;

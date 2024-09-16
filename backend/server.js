import express from 'express';
import cors from 'cors';
import loginRouter from './routes/adminLogin.js';
import branch from './routes/branch.js';
import employeesRouter from './routes/employees.js';
import corsOptions from './config/cors.js';
import cookieParser from 'cookie-parser';
import role from './routes/role.js';

const app = express();
const port = process.env.port;
app.use(cors(corsOptions));
// allow using json in request
app.use(express.json());
// allow accessing cookies in the request
app.use(cookieParser());

//make the routing
app.use('/auth',loginRouter);
app.use('/branch',branch);
app.use('/employees',employeesRouter);
app.use('/role',role);


app.listen(port, () => {
    console.log(`connecting on the port ${port}...`);
});
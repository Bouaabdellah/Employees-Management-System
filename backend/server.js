import express from 'express';
import cors from 'cors';
import loginRouter from './routes/adminLogin.js';
import branch from './routes/branch.js';
import employeesRouter from './routes/employees.js';

const app = express();
const port = process.env.port;
app.use(cors());
// allow using json in request
app.use(express.json());

//make the routing
app.use('/auth',loginRouter);
app.use('/branch',branch);
app.use('/employees',employeesRouter);


app.listen(port, () => {
    console.log(`connecting on the port ${port}...`);
});
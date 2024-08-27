import express from 'express';


const app = express();
const port = process.env.port;

app.listen(port, () => {
    console.log(`connecting on the port ${port}...`);
});
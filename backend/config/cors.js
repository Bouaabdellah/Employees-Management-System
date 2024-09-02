const server_port = process.env.port;
const react_port = process.env.react_port;
const whiteList = [`http://127.0.0.1:${server_port}`,`http://127.0.0.1:${react_port}`,
    `http://localhost:${server_port}`,`http://localhost:${react_port}`,'http://www.employees-mg.com']

const corsOptions = {
    origin : (origin,callback) => {
        if (!origin || whiteList.indexOf(origin) !== -1)
            callback(null,true);  // null it mean that there is no error
        else
            callback(new Error('not allowed by CORS'));
    },
    optionsSuccessStatus : 200
}

export default corsOptions;
const port = process.env.port;
const whiteList = [`http://127.0.0.1:${port}`,`http://localhost:${port}`,'http://www.employees-mg.com']

export default corsOptions = {
    origin : (origin,callback) => {
        if (!origin || whiteList.indexOf(origin) !== -1)
            callback(null,true);  // null it mean that there is no error
        else
            callback(new Error('not allowed by CORS'));
    },
    optionsSuccessStatus : 200
}
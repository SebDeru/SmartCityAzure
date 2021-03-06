const Router1 = require('./api/v1/routes');
const express = require('express');
const cors = require('cors');
const versionRoutes = require('express-routes-versioning')();
const app = express();
const process = require("process");
const port = process.env.PORT

app.use(express.json());
app.use(cors());

app.listen(port);

app.use('/', versionRoutes({
    "1.0.0": respondV1,
}, NoMatchFoundCallback));

function NoMatchFoundCallback(req, res){
    res.status(404).send('API version not found');
}

function respondV1(req, res, next){
    app.use('/', Router1);
    next();
}

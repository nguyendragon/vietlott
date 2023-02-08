import Helper from '../helpers';
import config from '../config';
import initWebRouter from '../api/web.js';

import express from 'express';
import path from 'path';
import createError from 'http-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get(/./, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

initWebRouter(app);

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

/****************************************************** */

const port = config.PORT_SERVER;

const USE_SSL = false;

let httpServer = null;
if (!USE_SSL) {
    httpServer = require('http').createServer(app);
} else {
    let options = Helper.ssl;
    httpServer = require('https').createServer(options, app);
}

httpServer.listen(port, () => {
    console.log('Server start port: ' + port);
});

import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
////
import Helper from '../helpers';
import config from '../config';
import cronJobGames from '../CronGames/cronGameController';
const app = express();

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

const USE_SSL = false;

var httpServer = null;
if (!USE_SSL) {
    httpServer = require('http').createServer(app);
} else {
    let options = Helper.ssl;
    httpServer = require('https').createServer(options, app);
}

const io = new Server(httpServer, {
    cors: {
        origin: `${USE_SSL ? 'https' : 'http'}://${config.DOMAIN}`,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

cronJobGames(io);

io.on('connection', (socket) => {
    socket.on('send_message', (data) => {
        socket.broadcast.emit('send_message', data);
    });
});

httpServer.listen(config.PORT_GAME, () => {
    console.log('Game start port: ' + config.PORT_GAME);
});

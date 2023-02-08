import mysql from 'mysql2/promise';
import config from '../config';

const connection = mysql.createPool({
    host: config.DATA_HOST,
    user: config.DATA_USER,
    password: config.DATA_PASS,
    database: config.DATA_DB,
    connectionLimit: 10,
});

export default connection;

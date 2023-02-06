const fs = require('fs');
const path = require('path');
require('dotenv').config();

const CF_SSL_KEY = process.env.CF_SSL_KEY || 'certs/panazic.key';
const CF_SSL_KEY_CERT = process.env.CF_SSL_KEY_CERT || 'certs/panazic.crt';

let ssl = {
    key: fs.readFileSync(path.resolve(__dirname, CF_SSL_KEY), 'utf8'),
    cert: fs.readFileSync(path.resolve(__dirname, CF_SSL_KEY_CERT), 'utf8'),
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
};

module.exports = {
    ssl,
};

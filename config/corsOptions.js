const allowedOrigins = require('./allowedOrigins');

const crosOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CROS'));
        }
    },
    credentials: true,
    optionSuccessStatus: 200
}

module.exports = crosOptions;
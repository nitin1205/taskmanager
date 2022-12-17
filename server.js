const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const crosOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3000;

app.use(logger);

app.use(express.json());

app.use(cookieParser());

app.use(cors(crosOptions));

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: "404 Not FOund" });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`the server is running on port ${PORT}`)); 

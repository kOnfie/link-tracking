const express = require('express');
const cors = require('cors');

const linkRouter = require('./routes/linkRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/link', linkRouter);

module.exports = app;

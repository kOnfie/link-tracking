const express = require('express');
const cors = require('cors');

const linkRouter = require('./routes/linkRoutes');
const handlePartnerLinkRouter = require('./routes/handlePartnerLinkRoutes');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*', // або '*', якщо потрібен доступ для всіх
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use('/link', linkRouter);
app.use('/', handlePartnerLinkRouter);

module.exports = app;

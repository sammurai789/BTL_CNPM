const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');

dotenv.config();
const app = express();
const port = 3000;

mongoose.connect(process.env.URL_MONGODB, {
    autoIndex: false
}, (err) => {
    if(err) throw err;
    console.log('Mongodb connection.')
})

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

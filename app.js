require('dotenv').config();
const express = require('express');
const database = require('./Database/config');
const router = require('./Routers/routers')
const fileRouter = require('./Routers/fileupload')
const app = express();
const port = process.env.PORT;
database.initialize(error => {
    if (error) {
        console.error('Error connecting Database');
        console.error(error);
        process.exit(1);
    }
    console.log('Connected to Database');
});
app.use(express.json())
app.use('/', router)
app.use('/file', fileRouter)
app.listen(port, () =>
    console.log(`listening on port. ${port}`)
);
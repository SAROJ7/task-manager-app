const express = require('express');
const app = express();
const port = 5000;

const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');




require('dotenv').config();
// middleware
app.use(express.json());
app.use(express.static('./public'));
// middleware route
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT || port, () => {
            console.log(`App is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('../backend/routes/employee');

const app = express();

// Create PORT
const PORT = process.env.PORT || 4000;

//Connection to Database
mongoose.connect('mongodb://127.0.0.1:27017/Employee-Detail')
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("Could not connect to database : " + err));

//Middleware - Plugin
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Routes
app.use('/api', routes);

app.listen(PORT, () => {
    console.log('Connected to PORT ' + PORT)
});
const tasks = require('./routes/tasks');
// const index = require('./routes/index');
const mongoose = require('mongoose');
const { Task } = require('./models/task');
const ejs = require('ejs');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/todolist', () => console.log('Connected to MongoDb...'));

app.use(express.json());
app.use('/tasks', tasks);

app.get('/', async (req,res) => {
    res.redirect('/tasks');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}...`));
const mongoose = require('mongoose');
const { Task } = require('../models/task');
const { validate } = require('../models/task');
const express = require('express');
const router = express.Router();

router.use(express.static("public"));

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('list', { list: tasks});
})

router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const task = new Task({
        task: req.body.task,
        completed: false
    });

    await task.save();
    res.redirect('/tasks');
});

router.post('/update/:id', async (req, res) => {
    const taskItem = await Task.findById(req.params.id);
    if(!taskItem) return res.status(404).send('task not found...');

    taskItem.completed = !taskItem.completed;

    await taskItem.save();

    res.redirect('/tasks');
})

router.get('/removeCompleted', async (req, res) => {
    await Task.deleteMany({ completed: true });
    res.redirect('/tasks'); 
})

router.get('/deleteAll', async (req, res) => {
    await Task.deleteMany({});
    res.redirect('/tasks');
});

router.get('/delete/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if(!task) return res.status(404).send('task not found...');
    
    res.redirect('/tasks');
});

module.exports = router;
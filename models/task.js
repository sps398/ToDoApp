const Joi = require("joi");
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

function validate(tasks) {
    const schema = Joi.object({
        task: Joi.string().required(),
        completed: Joi.boolean()
    })
    return schema.validate(tasks);
}

exports.Task = Task;
exports.validate = validate;
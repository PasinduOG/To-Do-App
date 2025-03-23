const Task = require('../models/Task');

// සියලු Tasks ලබාගැනීම
exports.getAllTasks = (req, res) => {
    res.json(Task.getAllTasks());
};

// නව Task එකක් ඇතුලත් කිරීම
exports.createTask = (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title ඇතුලත් කරන්න!' });
    const newTask = Task.addTask(title);
    res.status(201).json(newTask);
};

// Task එක Update කිරීම
exports.updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;
    const updatedTask = Task.updateTask(id, title);
    if (!updatedTask) return res.status(404).json({ error: 'Task හමු නොවීය!' });
    res.json(updatedTask);
};

// Task එක Delete කිරීම
exports.deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    Task.deleteTask(id);
    res.status(204).send();
};
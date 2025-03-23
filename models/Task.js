let tasks = [
    { id: 1, title: 'Node.js ඉගෙන ගන්න' },
    { id: 2, title: 'Express පාවිච්චි කරන්න' }
];

// සියලු Tasks ලබාගන්න
const getAllTasks = () => tasks;

// නව Task එකක් එකතු කරන්න
const addTask = (title) => {
    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);
    return newTask;
};

// Task එක Update කරන්න
const updateTask = (id, newTitle) => {
    const task = tasks.find(task => task.id === id);
    if (task) task.title = newTitle;
    return task;
};

// Task එක Delete කරන්න
const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    return id;
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
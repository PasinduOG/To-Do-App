const API_URL = "http://localhost:3000/api/tasks"; // Backend API URL එක
const taskForm = document.getElementById("taskForm"); // Form එක
const tasksDiv = document.getElementById("tasks"); // Tasks පෙන්වන div එක

// 1. පිටුව load වෙනකොට Tasks ලබාගන්න
document.addEventListener("DOMContentLoaded", loadTasks);

// 2. Form එක Submit කරන විට
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // පිටුව refresh නොවීමට
    const titleInput = document.getElementById("title");
    const title = titleInput.value.trim(); // Input එකේ අගය ගන්න

    if (!title) return; // හිස් නම් නවත්තන්න

    // 3. Edit කරනවද? (Edit බටනය ක්ලික් කලා නම්)
    const isEdit = taskForm.dataset.editId;
    if (isEdit) {
        await updateTask(isEdit, title); // Update කිරීම
        taskForm.removeAttribute("data-edit-id"); // Edit mode අක්‍රිය කරන්න
    } else {
        await addTask(title); // නව Task එකක් එකතු කිරීම
    }

    titleInput.value = ""; // Input එක හිස් කරන්න
    loadTasks(); // නැවත Tasks ලබාගන්න
});

// 4. සියලු Tasks ලබාගන්න (API එකට ඉල්ලීමක් කිරීම)
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json(); // JSON බවට පරිවර්තනය
        displayTasks(tasks); // Tasks පෙන්වන function එක කැඳවීම
    } catch (error) {
        console.error("Tasks ලබා ගැනීමේ දෝෂය:", error);
        alert("කරුණාකර Server එක Start කර ඇත්දැයි පරීක්ෂා කරන්න!");
    }
}

// 5. නව Task එකක් එකතු කිරීම
async function addTask(title) {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }), // JSON ලෙස යැවීම
        });
    } catch (error) {
        console.error("Task එකතු කිරීමේ දෝෂය:", error);
    }
}

// 6. Task එක Update කිරීම
async function updateTask(id, title) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });
    } catch (error) {
        console.error("Task Update කිරීමේ දෝෂය:", error);
    }
}

// 7. Task එක Delete කිරීම
async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadTasks(); // නැවත Tasks ලබාගන්න
    } catch (error) {
        console.error("Task Delete කිරීමේ දෝෂය:", error);
    }
}

// 8. Edit බටනය ක්ලික් කල විට
function editTask(id, currentTitle) {
    const titleInput = document.getElementById("title");
    titleInput.value = currentTitle; // Input එකට පැරණි Title එක යොදන්න
    taskForm.dataset.editId = id; // කුමන Task ID එක Edit කරන්නේද යන්න ගබඩා කිරීම
}

// 9. Tasks පිටුවේ පෙන්වීම
function displayTasks(tasks) {
    tasksDiv.innerHTML = ""; // පැරණි Tasks ඉවත් කිරීම
    
    tasks.forEach(task => {
        // HTML Element එකක් හදන්න
        const taskEl = document.createElement("div");
        taskEl.className = "task"; // CSS Class එක යොදන්න
        
        // Task එකේ HTML තැනීම
        taskEl.innerHTML = `
            <p>${task.title}</p>
            <button class="edit" onclick="editTask('${task.id}', '${task.title}')">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete" onclick="deleteTask('${task.id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        `;
        
        tasksDiv.appendChild(taskEl); // Tasks List එකට එකතු කිරීම
    });
}
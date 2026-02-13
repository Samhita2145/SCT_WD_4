let tasks = getTasks();
generateTimeOptions();
renderTasks(tasks);

document.getElementById("add-btn").addEventListener("click", addTask);

function generateTimeOptions() {
    const hourSelect = document.getElementById("task-hour");
    const minuteSelect = document.getElementById("task-minute");

    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        hourSelect.appendChild(option);
    }

    for (let i = 0; i < 60; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i.toString().padStart(2, "0");
        minuteSelect.appendChild(option);
    }
}

function addTask() {
    const title = document.getElementById("task-input").value.trim();
    const dateValue = document.getElementById("task-date").value;
    const hour = parseInt(document.getElementById("task-hour").value);
    const minute = document.getElementById("task-minute").value;
    const period = document.getElementById("task-period").value;

    if (!title) {
        alert("Please enter a task.");
        return;
    }

    if (!dateValue) {
        alert("Please select deadline date.");
        return;
    }

    let hour24 = hour;
    if (period === "PM" && hour !== 12) hour24 += 12;
    if (period === "AM" && hour === 12) hour24 = 0;

    const formattedHour = hour24.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");

    const deadline = `${dateValue}T${formattedHour}:${formattedMinute}:00`;

    const newTask = {
        id: generateID(),
        title,
        deadline,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks);

    document.getElementById("task-input").value = "";
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );

    saveTasks(tasks);
    renderTasks(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks(tasks);
}

function renderTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        const isOverdue =
            !task.completed &&
            new Date(task.deadline) < new Date();

        if (task.completed) li.classList.add("completed");
        if (isOverdue) li.classList.add("overdue");

        li.innerHTML = `
            <div class="task-info">
                <span class="task-title">${task.title}</span>
                <small class="task-deadline">
                    ${formatDate(task.deadline)}
                </small>
            </div>

            <div class="task-actions">
                <button onclick="toggleTask('${task.id}')" class="icon-btn complete-btn">
                    ${checkIcon()}
                </button>

                <button onclick="deleteTask('${task.id}')" class="icon-btn delete-btn">
                    ${deleteIcon()}
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats(tasks);
    updateProgress(tasks);
}

function updateStats(tasks) {

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(t =>
        !t.completed && new Date(t.deadline) < new Date()
    ).length;

    document.getElementById("stats").innerHTML = `
        <div class="stat-box">
            <span>Total</span>
            <strong>${total}</strong>
        </div>

        <div class="stat-box success">
            <span>Completed</span>
            <strong>${completed}</strong>
        </div>

        <div class="stat-box warning">
            <span>Pending</span>
            <strong>${pending}</strong>
        </div>

        <div class="stat-box danger">
            <span>Overdue</span>
            <strong>${overdue}</strong>
        </div>
    `;
}

function updateProgress(tasks) {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const percent = total === 0 ? 0 : (completed / total) * 100;

    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").innerText =
        Math.round(percent) + "% Completed";
}



function checkIcon() {
    return `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
         stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
    </svg>`;
}

function deleteIcon() {
    return `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
         stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M19 6L18 20H6L5 6"/>
    </svg>`;
}
